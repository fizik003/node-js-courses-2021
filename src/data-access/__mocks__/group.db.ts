import { groupsMock } from '../../mocks';
import { IGroup, IGroupReq } from '../../models';
import { v1 as uuidv1 } from 'uuid';

const groups = groupsMock;

export const get = jest.fn().mockResolvedValue(groups);

export const getById = jest.fn().mockImplementation((id: string) => {
  const group = groups.find((group) => group.id === id);
  return Promise.resolve(group);
});

export const create = jest.fn().mockImplementation((groupData: IGroupReq) => {
  const newGroup: IGroup = {
    id: uuidv1(),
    ...groupData,
  };

  groups.push(newGroup);
  return Promise.resolve(newGroup);
});

export const update = jest
  .fn()
  .mockImplementation((id: string, groupData: Partial<IGroupReq>) => {
    let groupIndex: number;
    const updatedRows = Object.keys(groupData).length;
    const group = groups.find((group, index) => {
      groupIndex = index;
      return group.id === id;
    });
    if (group) {
      groups[groupIndex] = {
        ...group,
        ...groupData,
      };

      return Promise.resolve([updatedRows, [groups[groupIndex]]]);
    }
  });

export const drop = jest.fn().mockImplementation((id: string) => {
  const groupIndex = groups.findIndex((group) => group.id === id);
  let returnRes = 0;
  if (groupIndex + 1) {
    groups.splice(groupIndex, 1);
    returnRes = 1;
  }

  return Promise.resolve(returnRes);
});
