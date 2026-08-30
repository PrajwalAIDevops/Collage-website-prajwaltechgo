import { Router } from 'express';
import authRoutes from './auth.routes.js';
import studentRoutes from './student.routes.js';
import admissionRoutes from './admission.routes.js';
import adminRoutes from './admin.routes.js';
import courseRoutes from './course.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/admissions', admissionRoutes);
router.use('/admin', adminRoutes);
router.use('/courses', courseRoutes);

export default router;
