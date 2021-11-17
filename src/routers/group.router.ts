import { Router } from 'express';
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
