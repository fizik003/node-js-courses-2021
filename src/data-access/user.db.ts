import { Op } from 'sequelize';
import { Group } from '../models/group.model';
import { IUserReq, User } from '../models/user.model';

export async function getAll() {
  return User.findAll({
    where: {
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
    include: {
      model: Group,
    },
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
  const deletedUser = await User.findByPk(id);
  if (!deletedUser) return false;

  deletedUser.set('isDeleted', true);
  deletedUser.save();
  return true;
}
