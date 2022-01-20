import { userService } from './';
import { sign, verify } from 'jsonwebtoken';
import config from '../common/config';
import { ForbiddenError, NotFoundError, UnauthorizedError } from '../common/errors';

const { JWT_REFRESH_SECRET_KEY, JWT_ACCESS_SECRET_KEY } = config;

export const login = async (login: string, passward: string) => {
  const user = await userService.getByLogin(login);
  if (!user || user.password !== passward) throw new NotFoundError('invalid login or password');

  const payload = { id: user.id, login: user.login };
  const accessToken = sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: '60m' });
  return { accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  verify(token, JWT_REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new ForbiddenError();
    }

    const payload = { id: decoded?.id, login: decoded?.login };
    const accessToken = sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn: '10m' });
    return { accessToken, refreshToken: token };
  });
};
