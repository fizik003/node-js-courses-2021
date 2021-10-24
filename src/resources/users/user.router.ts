import { IUserReq } from './user.model';
import { Router } from 'express';
import * as userService from './user.service';

export const router = Router();

router.get('/', async (req, res) => {
  const users = await userService.getAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await userService.get(req.params.id);
  if (!user) {
    return res.json({ message: 'user not found' }).status(404);
  }

  res.json(user);
});

router.post('/', async (req, res) => {
  const userData: IUserReq = {
    login: req.body.login,
    age: req.body.age,
    password: req.body.age,
  };

  const newUser = await userService.create(userData);
  if (!newUser) return res.json({ message: 'user not created' }).status(400);

  res.json(newUser);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { login, age, password } = req.body;
  const userData: Partial<IUserReq> = {
    ...(login && { login }),
    ...(age && { age }),
    ...(password && { password }),
  };

  const updatedUser = await userService.update(id, userData);
  if (!updatedUser) return res.json({ message: 'user not updated' }).status(400);

  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.remove(id);
  if (!deletedUser) return res.json({ message: 'user not deleted' }).status(400);

  res.json(deletedUser);
});
