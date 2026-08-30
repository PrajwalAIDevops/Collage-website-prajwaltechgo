import { db } from '../config/database.js';

export const studentService = {
  /**
   * Get student profile by user_id from MySQL
   */
  async getProfile(userId: number) {
    const [rows] = await db.query<any[]>(
      `SELECT 
        s.id as student_id,
        s.user_id,
        u.name,
        u.email,
        u.role,
        COALESCE(s.phone, u.phone, '') as phone,
        s.date_of_birth,
        s.gender,
        s.address,
        s.previous_qualification,
        s.previous_institution,
        s.percentage,
        s.created_at
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE u.id = ?`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      // Check if user exists without student record, create one
      const [userRows] = await db.query<any[]>(
        'SELECT id, name, email, phone, role FROM users WHERE id = ?',
        [userId]
      );

      if (!userRows || userRows.length === 0) {
        const err: any = new Error('Student account not found');
        err.statusCode = 404;
        throw err;
      }

      const user = userRows[0];
      const [insertResult] = await db.query<any>(
        'INSERT INTO students (user_id, phone) VALUES (?, ?)',
        [user.id, user.phone || '']
      );

      return {
        student_id: insertResult.insertId,
        user_id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        date_of_birth: null,
        gender: null,
        address: null,
        previous_qualification: null,
        previous_institution: null,
        percentage: null,
        created_at: new Date().toISOString(),
      };
    }

    return rows[0];
  },

  /**
   * Update student profile in MySQL
   */
  async updateProfile(userId: number, data: any) {
    const {
      name,
      phone,
      date_of_birth,
      gender,
      address,
      previous_qualification,
      previous_institution,
      percentage,
    } = data;

    // Update user table name/phone if provided
    if (name || phone) {
      await db.query(
        'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?',
        [name || null, phone || null, userId]
      );
    }

    // Update students table
    await db.query(
      `UPDATE students SET
        phone = COALESCE(?, phone),
        date_of_birth = COALESCE(?, date_of_birth),
        gender = COALESCE(?, gender),
        address = COALESCE(?, address),
        previous_qualification = COALESCE(?, previous_qualification),
        previous_institution = COALESCE(?, previous_institution),
        percentage = COALESCE(?, percentage)
      WHERE user_id = ?`,
      [
        phone || null,
        date_of_birth || null,
        gender || null,
        address || null,
        previous_qualification || null,
        previous_institution || null,
        percentage !== undefined ? Number(percentage) : null,
        userId,
      ]
    );

    return this.getProfile(userId);
  },

  /**
   * Get applications for a specific user/student from MySQL
   */
  async getStudentApplications(userId: number) {
    const [rows] = await db.query<any[]>(
      `SELECT 
        a.id,
        a.student_id,
        a.course_id,
        a.application_number,
        a.status,
        a.remarks,
        a.submitted_at,
        a.updated_at,
        c.name as course_name,
        c.duration as course_duration,
        c.fees as course_fees
      FROM admission_applications a
      JOIN students s ON a.student_id = s.id
      JOIN courses c ON a.course_id = c.id
      WHERE s.user_id = ?
      ORDER BY a.id DESC`,
      [userId]
    );

    return rows || [];
  },
};

export default studentService;
