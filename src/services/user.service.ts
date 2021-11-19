import { userDb } from '../data-access';
import { IUserReq } from '../models/user.model';

export const getUsers = async (subStr?: string, limit?: string) => {
  if (subStr !== undefined || limit !== undefined) {
    const isNumber = /^\d+$/.test(limit);
    subStr = subStr ? subStr : '';
    const limitRes = isNumber ? Number(limit) : undefined;
    return await userDb.getByParams(subStr, limitRes);
  }
  const users = await userDb.getAll();
  return users;
};

export const get = async (id: string) => {
  const user = await userDb.get(id);
  if (user) return user;

  return null;
};

export const create = async (user: IUserReq) => {
  const newUser = await userDb.create(user);
  if (!newUser) return;

  return newUser;
};

export const update = async (id: string, userData: Partial<IUserReq>) => {
  const updatedUser = await userDb.update(id, userData);
  if (!updatedUser[0]) return;

  return updatedUser[1][0];
};

export const remove = async (id: string) => {
  const isDeleted = await userDb.remove(id);
  if (!isDeleted) return;
  return isDeleted;
};
