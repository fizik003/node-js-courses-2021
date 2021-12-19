import { groupDb } from '../data-access';
import { IGroupReq } from '../models';

export const getAll = async () => {
  const groups = await groupDb.get();
  return groups;
};

export const getById = async (id: string) => {
  const group = await groupDb.getById(id);
  return group;
};

export const create = async (groupData: IGroupReq) => {
  const group = await groupDb.create(groupData);
  return group;
};

export const update = async (id: string, updateData: Partial<IGroupReq>) => {
  const updatedData = await groupDb.update(id, updateData);
  if (!updatedData[0]) return;

  return updatedData[1][0];
};

export const drop = async (id: string) => {
  const isDelete = !!(await groupDb.drop(id));
  return isDelete;
};

export const addUsersToGroup = async (idGroup: string, idUsers: string[]) => {
  const group = await groupDb.addUsersToGroup(idGroup, idUsers);
  return group;
};
