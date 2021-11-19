import { userFieldValidator } from '../middleware';
import { IUserReq } from '../models/user.model';
import { Router } from 'express';
import { userService } from '../services/';

export const router = Router();

router.get('/', async (req, res) => {
  const { loginSubstring, limit } = req.query;
  const users = await userService.getUsers(loginSubstring as string, limit as string);

  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await userService.get(req.params.id);

  if (!user) {
    return res.json({ message: 'user not found' }).status(404);
  }

  res.json(user);
});

router.post('/', userFieldValidator, async (req, res) => {
  const userData: IUserReq = {
    login: req.body.login,
    age: req.body.age,
    password: req.body.password,
  };

  const newUser = await userService.create(userData);
  res.json(newUser);
});

router.put('/:id', userFieldValidator, async (req, res) => {
  const id = req.params.id;
  const { login, age, password } = req.body;
  const userData: Partial<IUserReq> = {
    login,
    age,
    password,
  };

  const updatedUser = await userService.update(id, userData);
  if (!updatedUser) return res.json({ message: 'user not updated' }).status(400);

  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const isDeleted = await userService.remove(id);
  if (!isDeleted) return res.json({ message: 'user was not deleted' }).status(400);

  res.json('User deleted');
});
