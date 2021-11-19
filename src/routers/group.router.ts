import { Router } from 'express';
import { groupFieldValidation } from '../middleware/groupFieldValidation';
import { IGroupReq, Per, Permission } from '../models/group.model';
import { groupService } from '../services';

export const router = Router();

router.get('/', async (req, res) => {
  const groups = await groupService.getAll();
  res.json(groups);
});

router.get('/:id', async (req, res) => {
  const group = await groupService.getById(req.params.id);
  if (!group) return res.json({ message: 'group not found' }).status(404);

  res.json(group);
});

router.post('/', groupFieldValidation, async (req, res) => {
  const permisions = req.body.permission.split(',') as Per[];
  const groupData: IGroupReq = {
    name: req.body.name,
    permission: permisions,
  };

  const newGroup = await groupService.create(groupData);
  if (!newGroup) return res.json({ message: 'group did not created' });

  res.json(newGroup);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, permission } = req.body;
  let updateData: Partial<IGroupReq> = {};
  updateData.name = name;
  if (permission) {
    updateData.permission = (permission as string).split(',') as Per[];
  }
  const updatedGroup = await groupService.update(id, updateData);
  if (!updatedGroup) return res.json({ message: 'group not updated' }).status(400);

  res.json(updatedGroup);
});

router.delete('/:id', async (req, res) => {
  const isDeleted = await groupService.drop(req.params.id);
  if (!isDeleted) return res.json({ message: 'group was not deleted' });
  res.json({ message: 'OK' });
});
