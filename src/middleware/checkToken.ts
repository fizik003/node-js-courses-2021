import { verify } from 'jsonwebtoken';
import config from '../common/config';
import { Response, Request, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../common/errors';

const { JWT_ACCESS_SECRET_KEY } = config;

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const openPath = ['/login', '/refresh-token', '/user/create'];
  if (openPath.includes(req.path)) return next();
  const token = await req.headers.authorization;

  if (token) {
    console.log(123);
    await verify(token, JWT_ACCESS_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        next(new ForbiddenError('Invalid token'));
      } else {
        next();
      }
    });
  } else {
    next(new UnauthorizedError());
  }
};
