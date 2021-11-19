import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../common/db';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface IGroup {
  id: string;
  name: string;
  permission: Permission[];
}

export interface IGroupReq extends Optional<IGroup, 'id'> {}

export class Group extends Model<IGroup, IGroupReq> implements IGroup {
  id!: string;
  name!: string;
  permission!: Permission[];
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
    tableName: 'groups',
    timestamps: false,
    updatedAt: false,
  }
);
