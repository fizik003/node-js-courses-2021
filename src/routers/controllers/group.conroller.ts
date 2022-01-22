import { Request, Response, NextFunction } from 'express';
import { groupService } from '../../services';
import { NotFoundError } from '../../common/errors';
import { Permission, IGroupReq } from '../../models';

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups = await groupService.getAll();
    res.json(groups);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.getById(req.params.id);
    if (!group) throw new NotFoundError();

    res.json(group);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permisions = req.body.permission.split(',') as Permission[];
    const groupData: IGroupReq = {
      name: req.body.name,
      permission: permisions,
    };
    const newGroup = await groupService.create(groupData);
    res.json(newGroup);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const { name, permission } = req.body;
    let updateData: Partial<IGroupReq> = {};
    updateData.name = name;
    if (permission) {
      updateData.permission = (permission as string).split(',') as Permission[];
    }
    const updatedGroup = await groupService.update(id, updateData);
    if (!updatedGroup) throw new NotFoundError();

    res.json(updatedGroup);
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isDeleted = await groupService.drop(req.params.id);
    if (!isDeleted) throw new NotFoundError();
    res.json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
};

export const addUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const idUsers = req.body.usersId;
    const group = await groupService.addUsersToGroup(id, idUsers);
    if (!group) throw new NotFoundError();

    res.json(group);
  } catch (error) {
    return next(error);
  }
};
