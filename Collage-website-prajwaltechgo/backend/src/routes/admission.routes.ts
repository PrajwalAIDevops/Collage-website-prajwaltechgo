import { Router } from 'express';
import { admissionController } from '../controllers/admission.controller.js';

const router = Router();

router.post('/apply', admissionController.submitApplication);
router.get('/:id', admissionController.getApplicationById);
router.get('/:id/history', admissionController.getApplicationHistory);

export default router;
