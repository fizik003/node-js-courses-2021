import { DataTypes } from 'sequelize';
import { sequelize } from '../common/db';
import { Group } from './group.model';
import { User } from './user.model';

interface IUserGroup {
  userId: string;
  groupId: string;
}

export const UserGroup = sequelize.define(
  'UserGroup',
  {
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    GroupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },
  { createdAt: false, updatedAt: false }
);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
