import { verify } from 'jsonwebtoken';
import config from '../common/config';
import { Response, Request, NextFunction } from 'express';
import { UnauthorizedError } from '../common/errors';

const { JWT_SECRET_KEY } = config;

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const openPath = ['/login', '/refresh-Token'];
  if (openPath.includes(req.path)) return next();
  const token = req.headers.authorization;

  if (token) {
    verify(token, JWT_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        next(new UnauthorizedError('Invalid token'));
      } else {
        next();
      }
    });
  }

  next(new UnauthorizedError());
};
