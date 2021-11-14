import { Op } from 'sequelize';
import { IUserInstance, IUserReq, User } from './user.model';

export async function getAll(): Promise<IUserInstance[]> {
  return User.findAll({
    where: {
      isDeleted: false,
    },
  });
}

export async function getByParams(
  subStr: string,
  limit?: number
): Promise<IUserInstance[] | undefined> {
  return User.findAll({
    where: {
      isDeleted: false,
      login: { [Op.substring]: subStr },
    },
    order: [['login', 'ASC']],
    limit: limit,
  });
}

export async function get(id: string): Promise<IUserInstance> {
  return User.findByPk(id);
}

export async function create(user: IUserReq): Promise<IUserInstance> {
  return User.create(user);
}

export async function update(
  id: string,
  userData: Partial<IUserReq>
): Promise<[number, IUserInstance[]]> {
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
