import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';

const router = Router();

router.get('/applications', adminController.getApplications);
router.patch('/applications/:id/status', adminController.updateStatus);
router.get('/students', adminController.getStudents);
router.get('/stats', adminController.getStats);

export default router;
