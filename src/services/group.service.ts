import { groupDb } from '../data-access';

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
