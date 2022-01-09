import { groupDb } from '../data-access';
import { Group, IGroup, IGroupReq } from '../models';
import { groupsMock } from './';
import { v1 as uuidv1 } from 'uuid';

export const groupDbMock = groupDb as jest.Mocked<typeof groupDb>;

const groups = groupsMock as Group[];

groupDbMock.get.mockResolvedValue(groups);

groupDbMock.getById.mockImplementation((id: string) =>
  Promise.resolve(groups.find((group) => group.id === id))
);

groupDbMock.create.mockImplementation((groupData: IGroupReq) => {
  const newGroup: IGroup = {
    id: uuidv1(),
    ...groupData,
  };

  groups.push(newGroup as Group);
  return Promise.resolve(newGroup as Group);
});

groupDbMock.update.mockImplementation((id: string, groupData: Partial<IGroupReq>) => {
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
    } as Group;

    return Promise.resolve([updatedRows, [groups[groupIndex]]]);
  }
});

groupDbMock.drop.mockImplementation((id: string) => {
  const groupIndex = groups.findIndex((group) => group.id === id);
  let returnRes = 0;
  if (groupIndex + 1) {
    groups.splice(groupIndex, 1);
    returnRes = 1;
  }

  return Promise.resolve(returnRes);
});
