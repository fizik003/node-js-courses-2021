import { Request, Response, NextFunction } from 'express';
import { userService } from '../../services';
import { NotFoundError } from '../../common/errors';
import { IUserReq } from '../../models';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loginSubstring, limit } = req.query;
    const users = await userService.getUsers(loginSubstring as string, limit as string);
    res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.get(req.params.id);
    if (!user) {
      throw new NotFoundError();
    }
    res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isDeleted = await userService.remove(id);
    if (!isDeleted) throw new NotFoundError();

    res.json('User deleted');
  } catch (error) {
    next(error);
  }
};
