import { sequelize } from '../common/db';
import { Group, IGroupReq, User } from '../models';

import { userDb } from './';

export async function get() {
  return Group.findAll({
    order: [['name', 'ASC']],
  });
}

export const getById = async (id: string) => {
  return Group.findByPk(id, { include: User });
};

export const create = async (groupData: IGroupReq) => {
  return Group.create(groupData);
};

export const update = async (id: string, updateData: Partial<IGroupReq>) => {
  return Group.update(updateData, {
    where: {
      id,
    },
    returning: true,
  });
};

export const drop = async (id: string) => {
  return Group.destroy({ where: { id } });
};

export const addUsersToGroup = async (idGroup: string, idUsers: string[]) => {
  const t = await sequelize.transaction();
  try {
    const group = await getById(idGroup);
    await Promise.all(
      idUsers.map(async (id) => {
        const user = await userDb.get(id);
        return group.addUser(user, { transaction: t });
      })
    );
    await t.commit();
    return getById(idGroup);
  } catch (error) {
    t.rollback();
    return;
  }
};
