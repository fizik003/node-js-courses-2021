import { Group, IGroupReq } from '../models/group.model';

export async function get() {
  return Group.findAll({
    order: [['name', 'ASC']],
  });
}

export const getById = async (id: string) => {
  return Group.findByPk(id);
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
