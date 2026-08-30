import { db } from '../config/database.js';

export const courseService = {
  /**
   * Get all available academic courses from MySQL
   */
  async getAllCourses() {
    const [rows] = await db.query<any[]>(
      'SELECT id, name, description, duration, eligibility, fees, available_seats, created_at FROM courses ORDER BY id ASC'
    );
    return rows || [];
  },

  /**
   * Get single course details by ID from MySQL
   */
  async getCourseById(id: number) {
    const [rows] = await db.query<any[]>(
      'SELECT id, name, description, duration, eligibility, fees, available_seats, created_at FROM courses WHERE id = ?',
      [id]
    );

    if (!rows || rows.length === 0) {
      const err: any = new Error('Course not found');
      err.statusCode = 404;
      throw err;
    }

    return rows[0];
  },
};

export default courseService;
