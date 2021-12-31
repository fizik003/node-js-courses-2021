import { Op } from 'sequelize';
import { sequelize } from '../common/db';
import { IUserReq, User, Group } from '../models';

export async function getAll() {
  return User.findAll({
    where: {
      isDeleted: false,
    },
  });
}

export async function getByLogin(login: string) {
  return User.findOne({
    where: {
      login,
      isDeleted: false,
    },
  });
}

export async function getByParams(subStr: string, limit?: number) {
  return User.findAll({
    where: {
      isDeleted: false,
      login: { [Op.substring]: subStr },
    },
    order: [['login', 'ASC']],
    limit: limit,
  });
}

export async function get(id: string) {
  return User.findByPk(id, {
    include: [
      {
        model: Group,
      },
    ],
  });
}

export async function create(user: IUserReq) {
  return User.create(user);
}

export async function update(id: string, userData: Partial<IUserReq>) {
  return User.update(userData, {
    where: {
      id,
    },
    returning: true,
  });
}

export async function remove(id: string): Promise<boolean> {
  const t = await sequelize.transaction();
  try {
    const deletedUser = await User.findByPk(id);
    if (!deletedUser) return false;
    deletedUser.set('isDeleted', true);
    const userGroups = await deletedUser.getGroups();
    await deletedUser.removeGroups(userGroups, { transaction: t });
    await deletedUser.save({ transaction: t });
    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    return;
  }
}
