import { Request, Response, NextFunction } from 'express';
import { admissionService } from '../services/admission.service.js';

export const admissionController = {
  /**
   * POST /api/admissions/apply
   */
  async submitApplication(req: Request, res: Response, Next: NextFunction) {
    try {
      const { user_id, course_id, remarks } = req.body;
      if (!user_id || !course_id) {
        return res.status(400).json({
          success: false,
          message: 'user_id and course_id are required',
        });
      }

      const application = await admissionService.submitApplication(
        parseInt(user_id, 10),
        parseInt(course_id, 10),
        remarks
      );

      return res.status(201).json({
        success: true,
        message: 'Admission application submitted successfully',
        application,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/admissions/:id
   */
  async getApplicationById(req: Request, res: Response, Next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const application = await admissionService.getApplicationById(id);
      return res.status(200).json({
        success: true,
        application,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/admissions/:id/history
   */
  async getApplicationHistory(req: Request, res: Response, Next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const history = await admissionService.getApplicationHistory(id);
      return res.status(200).json({
        success: true,
        history,
      });
    } catch (error) {
      return Next(error);
    }
  },
};

export default admissionController;
