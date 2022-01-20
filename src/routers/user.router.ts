import { userFieldValidator } from '../middleware';
import { IUserReq } from '../models/user.model';
import { Router } from 'express';
import { userService } from '../services/';
import { NotFoundError } from '../common/errors';
import { userController } from './controllers';

export const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getById);
router.post('/', userFieldValidator, userController.create);
router.put('/:id', userFieldValidator, userController.update);
router.delete('/:id', userController.remove);
