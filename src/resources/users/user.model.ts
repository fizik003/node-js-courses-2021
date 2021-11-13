import { v1 as uuidv1 } from 'uuid';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

export interface IUserReq {
  password: string;
  age: number;
  login: string;
}

export interface IUserRes {
  id: string;
  login: string;
  age: number;
}

export class User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;

  constructor(user: IUserReq) {
    const { login, password, age } = user;
    this.id = uuidv1();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  static toResponce(user: IUser): IUserRes {
    const { login, id, age } = user;
    return { login, id, age };
  }
}
