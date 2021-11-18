import { groupDb } from '../data-access';
import { IGroupReq } from '../models/group.model';

export const getAll = async () => {
  const groups = await groupDb.get();
  if (!groups) return;
  return groups;
};

export const getById = async (id: string) => {
  const group = await groupDb.getById(id);
  if (!group) return;
  return group;
};

export const create = async (groupData: IGroupReq) => {
  const group = await groupDb.create(groupData);
  if (!group) return;

  return group;
};
