import { Request, Response, NextFunction } from 'express';
import { studentService } from '../services/student.service.js';

export const studentController = {
  /**
   * GET /api/students/profile/:userId
   */
  async getProfile(req: Request, res: Response, Next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const profile = await studentService.getProfile(userId);
      return res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * PUT /api/students/profile/:userId
   */
  async updateProfile(req: Request, res: Response, Next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const updatedProfile = await studentService.updateProfile(userId, req.body);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        profile: updatedProfile,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/students/:studentId/applications or /api/students/user/:userId/applications
   */
  async getApplications(req: Request, res: Response, Next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId || req.params.studentId, 10);
      const applications = await studentService.getStudentApplications(userId);
      return res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      return Next(error);
    }
  },
};

export default studentController;
