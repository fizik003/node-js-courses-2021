import app from '../app';
import request from 'supertest';
import { groupsMock } from '../mocks';

jest.mock('../data-access/user.db');
jest.mock('../data-access/group.db');

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
    const countGroups = groupsMock.length;
    const res = await request(app)
      .post('/group')
      .send({ name: 'group', permission: 'READ' })
      .set('Authorization', token);

    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('group');
    expect(res.body).toHaveProperty('id');
    expect(groupsMock.length).toEqual(countGroups + 1);
  });

  it('DELETE: /group/:id - should delete group', async () => {
    const countGroups = groupsMock.length;
    const id = 'd0ddd9b0-503d-11ec-9374-d5aa7bf3c4d2';
    const res = await request(app)
      .delete(`/group/${id}`)
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(groupsMock.length).toEqual(countGroups - 1);
  });
});
