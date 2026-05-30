import {Router } from 'express';
import * as userController from '../controllers/users/user_controller';

const router = Router();

router.get('/', userController.getUsers);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

export default router;  