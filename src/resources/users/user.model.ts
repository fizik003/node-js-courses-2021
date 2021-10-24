import { v1 as uuidv1 } from 'uuid';

export interface IUserReq {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
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

  constructor(login: string, password: string, age: number) {
    this.id = uuidv1();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  static toResponce(user: IUserReq): IUserRes {
    const { login, id, age } = user;
    return { login, id, age };
  }
}
