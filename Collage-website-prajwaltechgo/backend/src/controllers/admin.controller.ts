import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service.js';

export const adminController = {
  /**
   * GET /api/admin/applications
   */
  async getApplications(req: Request, res: Response, Next: NextFunction) {
    try {
      const { search, status, course_id } = req.query;
      const applications = await adminService.getAllApplications({
        search: search as string,
        status: status as string,
        course_id: course_id ? parseInt(course_id as string, 10) : undefined,
      });

      return res.status(200).json({
        success: true,
        count: applications.length,
        applications,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * PATCH /api/admin/applications/:id/status
   */
  async updateStatus(req: Request, res: Response, Next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status, remarks } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required',
        });
      }

      const application = await adminService.updateApplicationStatus(id, status, remarks);
      return res.status(200).json({
        success: true,
        message: `Application status updated to ${status}`,
        application,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/admin/students
   */
  async getStudents(req: Request, res: Response, Next: NextFunction) {
    try {
      const { search } = req.query;
      const students = await adminService.getAllStudents(search as string);
      return res.status(200).json({
        success: true,
        count: students.length,
        students,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/admin/stats
   */
  async getStats(req: Request, res: Response, Next: NextFunction) {
    try {
      const stats = await adminService.getDashboardStats();
      return res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      return Next(error);
    }
  },
};

export default adminController;
