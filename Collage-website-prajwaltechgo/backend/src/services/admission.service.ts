import { db } from '../config/database.js';

export const admissionService = {
  /**
   * Submit a new admission application to MySQL
   */
  async submitApplication(userId: number, courseId: number, remarks: string = '') {
    if (!courseId) {
      const err: any = new Error('Course selection is required');
      err.statusCode = 400;
      throw err;
    }

    // Verify student profile exists
    const [studentRows] = await db.query<any[]>(
      'SELECT id FROM students WHERE user_id = ?',
      [userId]
    );

    let studentId: number;
    if (!studentRows || studentRows.length === 0) {
      // Auto-create student record
      const [insertStudent] = await db.query<any>(
        'INSERT INTO students (user_id) VALUES (?)',
        [userId]
      );
      studentId = insertStudent.insertId;
    } else {
      studentId = studentRows[0].id;
    }

    // Verify course exists
    const [courseRows] = await db.query<any[]>(
      'SELECT id, name FROM courses WHERE id = ?',
      [courseId]
    );

    if (!courseRows || courseRows.length === 0) {
      const err: any = new Error('Selected course does not exist');
      err.statusCode = 404;
      throw err;
    }

    // Check if duplicate pending or under review application exists
    const [existingApps] = await db.query<any[]>(
      'SELECT id, application_number, status FROM admission_applications WHERE student_id = ? AND course_id = ? AND status IN ("PENDING", "UNDER_REVIEW", "APPROVED")',
      [studentId, courseId]
    );

    if (existingApps && existingApps.length > 0) {
      const err: any = new Error(`You already have an active application (${existingApps[0].application_number}) for this program.`);
      err.statusCode = 409;
      throw err;
    }

    // Generate unique application number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationNumber = `PTGC-2026-${randomSuffix}`;

    // Insert application into MySQL
    const [appResult] = await db.query<any>(
      `INSERT INTO admission_applications 
        (student_id, course_id, application_number, status, remarks) 
       VALUES (?, ?, ?, 'PENDING', ?)`,
      [studentId, courseId, applicationNumber, remarks || 'Online Application Submitted']
    );

    const applicationId = appResult.insertId;

    // Record initial status in history
    await db.query(
      `INSERT INTO application_status_history 
        (application_id, old_status, new_status, remarks) 
       VALUES (?, NULL, 'PENDING', ?)`,
      [applicationId, remarks || 'Initial Application Submitted']
    );

    return this.getApplicationById(applicationId);
  },

  /**
   * Get single application details with student, course, and history
   */
  async getApplicationById(id: number) {
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
        u.id as user_id,
        u.name as student_name,
        u.email,
        COALESCE(s.phone, u.phone, '') as phone,
        s.date_of_birth,
        s.gender,
        s.address,
        s.previous_qualification,
        s.previous_institution,
        s.percentage,
        c.name as course_name,
        c.duration as course_duration,
        c.fees as course_fees,
        c.eligibility as course_eligibility
      FROM admission_applications a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      const err: any = new Error('Admission application not found');
      err.statusCode = 404;
      throw err;
    }

    const application = rows[0];

    // Fetch status history
    const [historyRows] = await db.query<any[]>(
      `SELECT id, old_status, new_status, remarks, changed_at 
       FROM application_status_history 
       WHERE application_id = ? 
       ORDER BY id ASC`,
      [id]
    );

    return {
      ...application,
      history: historyRows || [],
    };
  },

  /**
   * Get status history for an application
   */
  async getApplicationHistory(applicationId: number) {
    const [rows] = await db.query<any[]>(
      `SELECT id, old_status, new_status, remarks, changed_at 
       FROM application_status_history 
       WHERE application_id = ? 
       ORDER BY id ASC`,
      [applicationId]
    );

    return rows || [];
  },
};

export default admissionService;
