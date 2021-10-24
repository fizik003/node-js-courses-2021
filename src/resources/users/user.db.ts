import * as DB from '../../common/db';
import { IUser, IUserReq, IUserRes } from './user.model';

export async function getAll(): Promise<IUser[]> {
  return DB.getAllUser();
}

export async function get(id: string): Promise<IUser> {
  return DB.getUser(id);
}

export async function create(user: IUserReq): Promise<IUser> {
  return DB.createUser(user);
}

export async function update(id: string, userData: Partial<IUserReq>): Promise<IUser> {
  return DB.updateUser(id, userData);
}

export async function remove(id: string): Promise<IUser | undefined> {
  return DB.deleteUser(id);
}
