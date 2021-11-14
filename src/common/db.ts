import { IUser, IUserReq, IUserRes, User } from '../resources/users/user.model';
import { Sequelize } from 'sequelize';
import config from './config';

const { DB_STR } = config;

export const sequelize = new Sequelize(DB_STR);
