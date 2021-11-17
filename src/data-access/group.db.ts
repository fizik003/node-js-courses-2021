import { Group, IGroupInstance } from '../models/group.model';

export async function getAll(): Promise<IGroupInstance[]> {
  return Group.findAll();
}
