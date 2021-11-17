import { Router } from 'express';
import { groupService } from '../services';

export const router = Router();

router.get('/', async (req, res) => {
  const groups = await groupService.getAll();
  res.json(groups);
});
