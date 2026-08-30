import { Router } from 'express';
import { studentController } from '../controllers/student.controller.js';

const router = Router();

router.get('/profile/:userId', studentController.getProfile);
router.put('/profile/:userId', studentController.updateProfile);
router.get('/:studentId/applications', studentController.getApplications);
router.get('/user/:userId/applications', studentController.getApplications);

export default router;
