import app from '../app';
import request from 'supertest';
import { groupsMock, usersMock } from '../mocks';
import { groupDb, userDb } from '../data-access';
import { v1 as uuidv1 } from 'uuid';
import { Group, IGroup, IGroupReq, IUser, IUserReq, User } from '../models';

jest.mock('../data-access/user.db');
jest.mock('../data-access/group.db');

const userDbMock = userDb as jest.Mocked<typeof userDb>;
const groups = groupsMock as Group[];

const noDeletedUsers = usersMock.filter((user) => !user.isDeleted) as User[];
const groupDbMock = groupDb as jest.Mocked<typeof groupDb>;

userDbMock.getAll.mockResolvedValue(noDeletedUsers);

userDbMock.get.mockImplementation((id: string) =>
  Promise.resolve(noDeletedUsers.find((user) => user.id === id))
);

userDbMock.create.mockImplementation((userData: IUserReq) => {
  const newUser: IUser = { id: uuidv1(), isDeleted: false, ...userData };
  usersMock.push(newUser);
  return Promise.resolve(newUser as User);
});

userDbMock.getByLogin.mockImplementation((login: string) =>
  Promise.resolve(noDeletedUsers.find((user) => user.login === login))
);

userDbMock.getByParams.mockImplementation((subStr: string, limit?: number) => {
  return Promise.resolve(
    noDeletedUsers
      .filter((user) => user.login.includes(subStr))
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit)
  );
});

userDbMock.remove.mockImplementation((id: string) => {
  const user = noDeletedUsers.find((user) => user.id === id);

  if (user) {
    user.isDeleted = true;
    return Promise.resolve(true);
  }
});

userDbMock.update.mockImplementation(
  (id: string, userData: Partial<IUserReq>) => {
    let userIndex: number;
    const user: User = noDeletedUsers.find((user, index) => {
      userIndex = index;
      return user.id === id;
    });
    if (user) {
      noDeletedUsers[userIndex] = {
        ...user,
        ...userData,
      } as User;
      return Promise.resolve([
        Object.keys(userData).length,
        [noDeletedUsers[userIndex]],
      ]);
    }
  }
);

groupDbMock.get.mockResolvedValue(groups);

groupDbMock.getById.mockImplementation((id: string) =>
  Promise.resolve(groups.find((group) => group.id === id))
);

groupDbMock.create.mockImplementation((groupData: IGroupReq) => {
  const newGroup: IGroup = {
    id: uuidv1(),
    ...groupData,
  };

  groups.push(newGroup as Group);
  return Promise.resolve(newGroup as Group);
});

groupDbMock.update.mockImplementation(
  (id: string, groupData: Partial<IGroupReq>) => {
    let groupIndex: number;
    const updatedRows = Object.keys(groupData).length;
    const group = groups.find((group, index) => {
      groupIndex = index;
      return group.id === id;
    });
    if (group) {
      groups[groupIndex] = {
        ...group,
        ...groupData,
      } as Group;

      return Promise.resolve([updatedRows, [groups[groupIndex]]]);
    }
  }
);

groupDbMock.drop.mockImplementation((id: string) => {
  const groupIndex = groups.findIndex((group) => group.id === id);
  let returnRes = 0;
  if (groupIndex + 1) {
    groups.splice(groupIndex, 1);
    returnRes = 1;
  }

  return Promise.resolve(returnRes);
});

describe('User router', () => {
  let token: string;

  beforeAll(async () => {
    const {
      body: { accessToken },
    } = await request(app)
      .post('/login')
      .send({ login: 'yury', password: 'qwerty' });
    token = accessToken;
  });

  it('GET: /user - should return all users', async () => {
    const countExistedUser = usersMock.filter((user) => !user.isDeleted).length;
    const res = await request(app).get('/user').set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(countExistedUser);
  });

  it('GET: /user?limit - should return corect number of user', async () => {
    const limit = 4;
    const res = await request(app)
      .get(`/user?limit=${limit}`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(limit);
  });

  it('GET: /user/:id - should return user with id', async () => {
    const id = '98bdc950-6a2d-11ec-a882-d3b7e3716a21';
    const res = await request(app)
      .get(`/user/${id}`)
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it('GET: /user/:id - should not return deleted user', async () => {
    const deletedUserId = '98bdc950-6a2d-11ec-a882-d3b7e3716a26';
    const res = await request(app)
      .get(`/user/${deletedUserId}`)
      .set('Authorization', token);
    expect(res.status).toBe(404);
    expect(res.text).toEqual('Not Found');
  });

  it('POST: /user/create - should create user', async () => {
    const usersAmount = usersMock.length;
    const res = await request(app)
      .post('/user/create')
      .send({ login: 'user', password: 'user000', age: 35 })
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.login).toEqual('user');
    expect(res.body).toHaveProperty('id');
    expect(usersMock.length).toEqual(usersAmount + 1);
  });

  it('PUT: /user/:id - should update user', async () => {
    const id = '98bdc950-6a2d-11ec-a882-d3b7e3716a25';
    const res = await request(app)
      .put(`/user/${id}`)
      .send({ login: 'yury3', password: 'qwerty4', age: 28 })
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.age).toEqual(28);
  });

  it('DELETE: /user/:id -should  delete user', async () => {
    const id = '98bdc950-6a2d-11ec-a882-d3b7e3716a25';
    const res = await request(app)
      .delete(`/user/${id}`)
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.text).toEqual('"User deleted"');
  });
});

describe('Group router', () => {
  let token: string;

  beforeAll(async () => {
    const {
      body: { accessToken },
    } = await request(app)
      .post('/login')
      .send({ login: 'yury', password: 'qwerty' });
    token = accessToken;
  });

  it('GET: /group - should return all group', async () => {
    const countGroups = groupsMock.length;
    const res = await request(app).get('/group').set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(countGroups);
  });

  it('GET: /group/:id - should return group by id', async () => {
    const id = 'd0ddd9b0-503d-11ec-9374-d5aa7bf3c4d1';
    const res = await request(app)
      .get(`/group/${id}`)
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(id);
  });

  it('POST: /group - should create group', async () => {
    const countGroups = groups.length;
    const res = await request(app)
      .post('/group')
      .send({ name: 'group', permission: 'READ' })
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('group');
    expect(res.body).toHaveProperty('id');
    expect(groups.length).toEqual(countGroups + 1);
  });

  it('DELETE: /group/:id - should delete group', async () => {
    const countGroups = groups.length;
    const id = 'd0ddd9b0-503d-11ec-9374-d5aa7bf3c4d2';
    const res = await request(app)
      .delete(`/group/${id}`)
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(groups.length).toEqual(countGroups - 1);
  });
});
