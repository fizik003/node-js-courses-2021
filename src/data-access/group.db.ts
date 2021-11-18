import { Group, IGroupInstance, IGroupReq } from '../models/group.model';

export async function get(): Promise<IGroupInstance[]> {
  return Group.findAll();
}

export const getById = async (id: string): Promise<IGroupInstance> => {
  return Group.findByPk(id);
};

export const create = async (groupData: IGroupReq): Promise<IGroupInstance> => {
  return Group.create(groupData);
};
