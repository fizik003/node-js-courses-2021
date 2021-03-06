import { userDb } from '../data-access';
import { IUserReq } from '../models';

export const getUsers = async (subStr?: string, limit?: string) => {
  if (subStr !== undefined || limit !== undefined) {
    const isNumber = /^\d+$/.test(limit);
    subStr = subStr ? subStr : '';
    const limitRes = isNumber ? Number(limit) : undefined;
    return userDb.getByParams(subStr, limitRes);
  }
  return userDb.getAll();
};

export const get = async (id: string) => {
  const user = await userDb.get(id);
  if (user) return user;
};

export const create = async (user: IUserReq) => {
  return userDb.create(user);
};

export const update = async (id: string, userData: Partial<IUserReq>) => {
  const updatedUser = await userDb.update(id, userData);
  if (!updatedUser[0]) return;

  return updatedUser[1][0];
};

export const getByLogin = async (login: string) => {
  return userDb.getByLogin(login);
};

export const remove = async (id: string) => {
  return await userDb.remove(id);
};
