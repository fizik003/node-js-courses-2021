import { sequelize } from '../common/db';
import {
  DataTypes,
  BelongsToManyAddAssociationMixin,
  Model,
  Optional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
} from 'sequelize';
import { Group } from './';

interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface IUserReq extends Optional<IUser, 'id' | 'isDeleted'> {}

export class User extends Model<IUser, IUserReq> implements IUser {
  id!: string;
  login!: string;
  password!: string;
  age!: number;
  isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addGroup!: BelongsToManyAddAssociationMixin<Group, number>;
  public removeGroups!: BelongsToManyRemoveAssociationsMixin<Group, string>;
  public getGroups!: BelongsToManyGetAssociationsMixin<Group>;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.isDeleted;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false,
    updatedAt: false,
  }
);
