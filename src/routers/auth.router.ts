import { Router } from 'express';
import { authController } from './controllers';
export const router = Router();

router.post('/', authController.login);

router.post('/refresh-token', authController.refreshToken);
