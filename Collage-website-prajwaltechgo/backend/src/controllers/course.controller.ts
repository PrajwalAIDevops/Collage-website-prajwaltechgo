import { Request, Response, NextFunction } from 'express';
import { courseService } from '../services/course.service.js';

export const courseController = {
  /**
   * GET /api/courses
   */
  async getCourses(req: Request, res: Response, Next: NextFunction) {
    try {
      const courses = await courseService.getAllCourses();
      return res.status(200).json({
        success: true,
        count: courses.length,
        courses,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/courses/:id
   */
  async getCourseById(req: Request, res: Response, Next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const course = await courseService.getCourseById(id);
      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      return Next(error);
    }
  },
};

export default courseController;
