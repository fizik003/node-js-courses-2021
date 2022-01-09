import { IUser, IUserReq, User } from '../models';
import { userDb } from '../data-access';
import { usersMock } from './';
import { v1 as uuidv1 } from 'uuid';

export const userDbMock = userDb as jest.Mocked<typeof userDb>;

const noDeletedUsers = usersMock.filter((user) => !user.isDeleted) as User[];

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

userDbMock.update.mockImplementation((id: string, userData: Partial<IUserReq>) => {
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
    return Promise.resolve([Object.keys(userData).length, [noDeletedUsers[userIndex]]]);
  }
});
