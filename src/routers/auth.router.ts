import { Router } from 'express';
import { authService } from '../services';
import { UnauthorizedError } from '../common/errors';

export const router = Router();

router.post('/', async (req, res, next) => {
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
});

router.post('/refresh-token', async (req, res, next) => {
  try {
    const refreshToken = req.body;
    const newToken = await authService.refreshToken(refreshToken);
  } catch (error) {
    next(error);
  }
});
