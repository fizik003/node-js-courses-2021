import { Router } from 'express';
import { addUsersToGroupValidation, groupFieldValidation } from '../middleware/';
import { groupCrontroller } from './controllers';

export const router = Router();

router.get('/', groupCrontroller.getGroups);
router.get('/:id', groupCrontroller.getById);
router.post('/', groupFieldValidation, groupCrontroller.create);
router.put('/:id', groupCrontroller.update);
router.delete('/:id', groupCrontroller.remove);
router.post('/:id', addUsersToGroupValidation, groupCrontroller.addUsers);
