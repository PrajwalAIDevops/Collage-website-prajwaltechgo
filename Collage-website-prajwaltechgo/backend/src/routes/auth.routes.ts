import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me/:id', authController.getMe);

export default router;
