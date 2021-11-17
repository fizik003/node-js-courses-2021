import { groupDb } from '../data-access';

export const getAll = async () => {
  const groups = await groupDb.getAll();
  if (!groups) return;
  return groups;
};
