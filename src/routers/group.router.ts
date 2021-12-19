import { Router } from 'express';
import { NotFoundError } from '../common/errors';
import { addUsersToGroupValidation, groupFieldValidation } from '../middleware/';

import { IGroupReq, Permission } from '../models/group.model';
import { groupService } from '../services';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const groups = await groupService.getAll();
    res.json(groups);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const group = await groupService.getById(req.params.id);
    if (!group) throw new NotFoundError();

    res.json(group);
  } catch (error) {
    return next(error);
  }
});

router.post('/', groupFieldValidation, async (req, res, next) => {
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
});

router.put('/:id', async (req, res, next) => {
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
});

router.delete('/:id', async (req, res, next) => {
  try {
    const isDeleted = await groupService.drop(req.params.id);
    if (!isDeleted) throw new NotFoundError();
    res.json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
});

router.post('/:id', addUsersToGroupValidation, async (req, res, next) => {
  try {
    const id = req.params.id;
    const idUsers = req.body.usersId;
    const group = await groupService.addUsersToGroup(id, idUsers);
    if (!group) throw new NotFoundError();

    res.json(group);
  } catch (error) {
    return next(error);
  }
});
