import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../../common/errors';
import { authService } from '../../services';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;
    const tokens = await authService.login(login, password);
    if (!tokens) {
      throw new UnauthorizedError();
    }

    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};
