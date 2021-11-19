import { Group, IGroupInstance, IGroupReq } from '../models/group.model';

export async function get(): Promise<IGroupInstance[]> {
  return Group.findAll({
    order: [['name', 'ASC']],
  });
}

export const getById = async (id: string): Promise<IGroupInstance> => {
  return Group.findByPk(id);
};

export const create = async (groupData: IGroupReq): Promise<IGroupInstance> => {
  return Group.create(groupData);
};

export const update = async (
  id: string,
  updateData: Partial<IGroupReq>
): Promise<[number, IGroupInstance[]]> => {
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
