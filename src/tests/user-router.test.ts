import app from '../app';
import request from 'supertest';

jest.mock('../data-access/user.db');

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
