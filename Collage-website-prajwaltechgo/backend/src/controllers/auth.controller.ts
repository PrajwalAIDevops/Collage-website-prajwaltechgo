import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';

export const authController = {
  /**
   * POST /api/auth/login
   * Simple email/password login
   */
  async login(req: Request, res: Response, Next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * POST /api/auth/register
   * Student registration
   */
  async register(req: Request, res: Response, Next: NextFunction) {
    try {
      const student = await authService.registerStudent(req.body);
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: student,
      });
    } catch (error) {
      return Next(error);
    }
  },

  /**
   * GET /api/auth/me/:id
   */
  async getMe(req: Request, res: Response, Next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await authService.getUserById(userId);
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return Next(error);
    }
  },
};

export default authController;
