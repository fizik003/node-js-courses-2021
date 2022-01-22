import { usersMock } from '../../mocks';
import { IUser, IUserReq, User } from '../../models';
import { v1 as uuidv1 } from 'uuid';

const noDeletedUsers = usersMock.filter((user) => !user.isDeleted);

export const getAll = jest
  .fn()
  .mockImplementation(() => Promise.resolve(noDeletedUsers));

export const get = jest.fn().mockImplementation((id: string) => {
  const user = noDeletedUsers.find((user) => user.id === id);
  return Promise.resolve(user);
});

export const create = jest.fn().mockImplementation((userData: IUserReq) => {
  const newUser: IUser = { id: uuidv1(), isDeleted: false, ...userData };
  usersMock.push(newUser);
  return Promise.resolve(newUser);
});

export const getByLogin = jest.fn().mockImplementation((login: string) => {
  const user = noDeletedUsers.find((user) => user.login === login);
  return Promise.resolve(user);
});

export const getByParams = jest
  .fn()
  .mockImplementation((subStr: string, limit?: number) => {
    const usersByParams = noDeletedUsers
      .filter((user) => user.login.includes(subStr))
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, limit);
    return Promise.resolve(usersByParams);
  });

export const remove = jest.fn().mockImplementation((id: string) => {
  const user = noDeletedUsers.find((user) => user.id === id);

  if (user) {
    user.isDeleted = true;
    return Promise.resolve(true);
  }
});

export const update = jest
  .fn()
  .mockImplementation((id: string, userData: Partial<IUserReq>) => {
    let userIndex: number;
    const user = noDeletedUsers.find((user, index) => {
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
  });
