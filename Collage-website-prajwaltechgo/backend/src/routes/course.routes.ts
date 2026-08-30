import { Router } from 'express';
import { courseController } from '../controllers/course.controller.js';

const router = Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

export default router;
