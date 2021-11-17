import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../common/db';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface IGroup {
  id: string;
  name: string;
  permission: Permission[];
}

export interface IGroupReq {
  name: string;
  permission: Permission[];
}

export interface IGroupInstance extends Model<IGroup, IGroupReq> {}

export const Group = sequelize.define('Group', {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});
