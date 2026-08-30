import { db } from '../config/database.js';

export interface ApplicationFilters {
  search?: string;
  status?: string;
  course_id?: number;
}

export const adminService = {
  /**
   * Get all admission applications with optional search and filters from MySQL
   */
  async getAllApplications(filters: ApplicationFilters = {}) {
    let sql = `
      SELECT 
        a.id,
        a.student_id,
        a.course_id,
        a.application_number,
        a.status,
        a.remarks,
        a.submitted_at,
        a.updated_at,
        u.name as student_name,
        u.email as email,
        COALESCE(s.phone, u.phone, '') as phone,
        s.percentage,
        s.previous_qualification,
        s.previous_institution,
        c.name as course_name,
        c.fees as course_fees,
        c.duration as course_duration
      FROM admission_applications a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON a.course_id = c.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (filters.status && filters.status !== 'ALL') {
      sql += ' AND a.status = ?';
      params.push(filters.status);
    }

    if (filters.course_id) {
      sql += ' AND a.course_id = ?';
      params.push(Number(filters.course_id));
    }

    if (filters.search && filters.search.trim()) {
      const searchTerm = `%${filters.search.trim()}%`;
      sql += ' AND (u.name LIKE ? OR u.email LIKE ? OR a.application_number LIKE ? OR s.phone LIKE ?)';
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY a.id DESC';

    const [rows] = await db.query<any[]>(sql, params);
    return rows || [];
  },

  /**
   * Update application status (Approve, Reject, Under Review, Pending) and log in history in MySQL
   */
  async updateApplicationStatus(id: number, status: string, remarks: string = '') {
    const validStatuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      const err: any = new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    // Get existing application
    const [existing] = await db.query<any[]>(
      'SELECT id, status FROM admission_applications WHERE id = ?',
      [id]
    );

    if (!existing || existing.length === 0) {
      const err: any = new Error('Admission application not found');
      err.statusCode = 404;
      throw err;
    }

    const oldStatus = existing[0].status;

    // Update status in admission_applications table
    await db.query(
      'UPDATE admission_applications SET status = ?, remarks = ? WHERE id = ?',
      [status, remarks || `Status changed to ${status}`, id]
    );

    // Record change in history table
    await db.query(
      'INSERT INTO application_status_history (application_id, old_status, new_status, remarks) VALUES (?, ?, ?, ?)',
      [id, oldStatus, status, remarks || `Status updated from ${oldStatus} to ${status}`]
    );

    // Return updated record
    const [updated] = await db.query<any[]>(
      `SELECT 
        a.id,
        a.student_id,
        a.course_id,
        a.application_number,
        a.status,
        a.remarks,
        a.submitted_at,
        a.updated_at,
        u.name as student_name,
        u.email,
        c.name as course_name
      FROM admission_applications a
      JOIN students s ON a.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ?`,
      [id]
    );

    return updated[0];
  },

  /**
   * Get all registered students from MySQL
   */
  async getAllStudents(search?: string) {
    let sql = `
      SELECT 
        s.id,
        s.user_id,
        u.name,
        u.email,
        COALESCE(s.phone, u.phone, '') as phone,
        s.date_of_birth,
        s.gender,
        s.address,
        s.previous_qualification,
        s.previous_institution,
        s.percentage,
        s.created_at,
        (SELECT c.name FROM admission_applications a JOIN courses c ON a.course_id = c.id WHERE a.student_id = s.id ORDER BY a.id DESC LIMIT 1) as course_name,
        (SELECT a.status FROM admission_applications a WHERE a.student_id = s.id ORDER BY a.id DESC LIMIT 1) as application_status,
        (SELECT a.application_number FROM admission_applications a WHERE a.student_id = s.id ORDER BY a.id DESC LIMIT 1) as application_number
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `;

    const params: any[] = [];
    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      sql += ' AND (u.name LIKE ? OR u.email LIKE ? OR s.phone LIKE ? OR s.previous_institution LIKE ?)';
      params.push(term, term, term, term);
    }

    sql += ' ORDER BY s.id DESC';

    const [rows] = await db.query<any[]>(sql, params);
    return rows || [];
  },

  /**
   * Get dashboard metric statistics from MySQL
   */
  async getDashboardStats() {
    const [studentCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM students');
    const [appCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM admission_applications');
    const [pendingCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM admission_applications WHERE status = "PENDING"');
    const [reviewCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM admission_applications WHERE status = "UNDER_REVIEW"');
    const [approvedCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM admission_applications WHERE status = "APPROVED"');
    const [rejectedCount] = await db.query<any[]>('SELECT COUNT(*) as count FROM admission_applications WHERE status = "REJECTED"');

    return {
      totalStudents: studentCount[0]?.count || 0,
      totalApplications: appCount[0]?.count || 0,
      pending: pendingCount[0]?.count || 0,
      underReview: reviewCount[0]?.count || 0,
      approved: approvedCount[0]?.count || 0,
      rejected: rejectedCount[0]?.count || 0,
    };
  },
};

export default adminService;
