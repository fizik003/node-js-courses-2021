import { Router } from 'express';
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

router.post('/', async (req, res) => {
  const permisions = req.body.permission.split(',') as Per[];
  const groupData: IGroupReq = {
    name: req.body.name,
    permission: permisions,
  };

  const newGroup = await groupService.create(groupData);
  if (!newGroup) return res.json({ message: 'group did not created' });

  res.json(newGroup);
});
