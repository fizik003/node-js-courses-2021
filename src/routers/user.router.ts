import { userFieldValidator } from '../middleware';
import { IUserReq } from '../models/user.model';
import { Router } from 'express';
import { userService } from '../services/';
import { NotFoundError } from '../common/errors';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { loginSubstring, limit } = req.query;
    const users = await userService.getUsers(loginSubstring as string, limit as string);
    res.json(users);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.get(req.params.id);
    if (!user) {
      throw new NotFoundError();
    }
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.post('/', userFieldValidator, async (req, res, next) => {
  try {
    const userData: IUserReq = {
      login: req.body.login,
      age: req.body.age,
      password: req.body.password,
    };
    const newUser = await userService.create(userData);
    res.json(newUser);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', userFieldValidator, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { login, age, password } = req.body;
    const userData: Partial<IUserReq> = {
      login,
      age,
      password,
    };

    const updatedUser = await userService.update(id, userData);
    if (!updatedUser) throw new NotFoundError();

    res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const isDeleted = await userService.remove(id);
    if (!isDeleted) throw new NotFoundError();

    res.json('User deleted');
  } catch (error) {
    next(error);
  }
});
