import { IUser, IUserReq, IUserRes, User } from '../resources/users/user.model';

export const DB = {
  users: [
    new User({ login: 'login1', password: 'password1', age: 17 }),
    new User({ login: 'login2', password: 'password2', age: 17 }),
  ],
};

export function getAllUser(): IUser[] {
  return DB.users;
}

export function getByParams(subString = '', limit?: number): IUser[] | undefined {
  const users = DB.users
    .filter((user) => user.login.toLocaleLowerCase().includes(subString.toLocaleLowerCase()))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
  return users;
}

export function getUser(id: string): IUser {
  return DB.users.filter((user) => !user.isDeleted && user.id === id)[0];
}

export function createUser(user: IUserReq): IUser {
  const newUser = new User(user);
  DB.users.push(newUser);
  return DB.users.find((user) => user.id === newUser.id);
}

export function updateUser(id: string, userData: Partial<IUserReq>) {
  let index: number;
  const user = DB.users.find((user, idx) => {
    if (user.id === id) {
      index = idx;
      return user;
    }
  });

  if (user) {
    const updatedUser = { ...user, ...userData };
    DB.users[index] = updatedUser;

    return updatedUser;
  }
}

export function deleteUser(id: string): IUser | undefined {
  let index: number;
  const user = DB.users.find((user, idx) => {
    if (user.id === id) {
      index = idx;
      return user;
    }
  });

  DB.users[index] = { ...user, isDeleted: true };

  return user;
}
