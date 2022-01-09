import { Model, DataTypes, Optional, BelongsToManyAddAssociationMixin } from 'sequelize';
import { sequelize } from '../common/db';
import { User } from './user.model';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
  id: string;
  name: string;
  permission: Permission[];
}

export interface IGroupReq extends Optional<IGroup, 'id'> {}

export class Group extends Model<IGroup, IGroupReq> implements IGroup {
  id!: string;
  name!: string;
  permission!: Permission[];

  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Groups',
    timestamps: false,
    updatedAt: false,
  }
);

Group.belongsToMany(User, { through: 'UserGroup', onDelete: 'CASCADE' });
User.belongsToMany(Group, { through: 'UserGroup', onDelete: 'CASCADE' });
