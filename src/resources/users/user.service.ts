import * as userDb from './user.db';
import { IUserReq, IUserRes, User } from './user.model';

export const getAll = async (): Promise<IUserRes[]> => {
  const users = await userDb.getAll();
  return users.filter((user) => !user.isDeleted).map((user) => User.toResponce(user));
};

export const get = async (id: string): Promise<IUserRes> => {
  const user = await userDb.get(id);
  if (user) {
    return User.toResponce(user);
  }
  return null;
};

export const create = async (user: IUserReq): Promise<IUserRes> => {
  const newUser = await userDb.create(user);
  if (!newUser) return;

  return User.toResponce(newUser);
};

export const update = async (id: string, userData: Partial<IUserReq>) => {
  const updatedUser = await userDb.update(id, userData);
  if (!updatedUser) return;
  return User.toResponce(updatedUser);
};

export const remove = async (id: string) => {
  const deletedUser = await userDb.remove(id);
  if (!deletedUser) return;
  return User.toResponce(deletedUser);
};
