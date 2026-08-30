import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Configuration from environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'college_platform';

let isMySqlConnected = false;
let mysqlCheckAttempted = false;

// Create MySQL connection pool with low timeout so it fails fast if offline
export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 2000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// ==========================================
// In-Memory Fallback Relational Store
// ==========================================

interface MemUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'admin';
  phone?: string;
  created_at: string;
}

interface MemStudent {
  id: number;
  user_id: number;
  phone?: string;
  date_of_birth?: string | null;
  gender?: string | null;
  address?: string | null;
  previous_qualification?: string | null;
  previous_institution?: string | null;
  percentage?: number | null;
  created_at: string;
}

interface MemCourse {
  id: number;
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  fees: number;
  available_seats: number;
  created_at: string;
}

interface MemApplication {
  id: number;
  student_id: number;
  course_id: number;
  application_number: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  remarks?: string;
  submitted_at: string;
  updated_at: string;
}

interface MemHistory {
  id: number;
  application_id: number;
  old_status?: string | null;
  new_status: string;
  remarks?: string;
  changed_at: string;
}

class MemoryDatabase {
  users: MemUser[] = [];
  students: MemStudent[] = [];
  courses: MemCourse[] = [];
  applications: MemApplication[] = [];
  history: MemHistory[] = [];

  private nextUserId = 1;
  private nextStudentId = 1;
  private nextCourseId = 1;
  private nextAppId = 1;
  private nextHistoryId = 1;

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    const salt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync('admin123', salt);
    const studentHash = bcrypt.hashSync('student123', salt);
    const now = new Date().toISOString();

    // 1. Seed Users
    this.users = [
      {
        id: this.nextUserId++,
        name: 'Administrator',
        email: 'admin@prajwaltechgo.edu',
        password_hash: adminHash,
        role: 'admin',
        phone: '080-28456789',
        created_at: now,
      },
      {
        id: this.nextUserId++,
        name: 'demo',
        email: 'demo@gmail.com',
        password_hash: studentHash,
        role: 'student',
        phone: '9876543210',
        created_at: now,
      },
      {
        id: this.nextUserId++,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        password_hash: studentHash,
        role: 'student',
        phone: '9876543210',
        created_at: now,
      },
      {
        id: this.nextUserId++,
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        password_hash: studentHash,
        role: 'student',
        phone: '9876543211',
        created_at: now,
      },
      {
        id: this.nextUserId++,
        name: 'Ananya Deshmukh',
        email: 'ananya.deshmukh@example.com',
        password_hash: studentHash,
        role: 'student',
        phone: '9876543212',
        created_at: now,
      },
      {
        id: this.nextUserId++,
        name: 'Ananya',
        email: 'ananya@example.com',
        password_hash: studentHash,
        role: 'student',
        phone: '9876543212',
        created_at: now,
      },
    ];

    // 2. Seed Courses
    this.courses = [
      {
        id: 1,
        name: 'BCA (Bachelor of Computer Applications)',
        description: 'A comprehensive undergraduate program focusing on computer science, software engineering, web technologies, and database architecture.',
        duration: '3 Years (6 Semesters)',
        eligibility: '10+2 / PUC equivalent with Mathematics/Computer Science with minimum 50% aggregate.',
        fees: 85000.0,
        available_seats: 60,
        created_at: now,
      },
      {
        id: 2,
        name: 'BBA (Bachelor of Business Administration)',
        description: 'Equips students with modern management principles, corporate finance, marketing strategies, and entrepreneurial leadership.',
        duration: '3 Years (6 Semesters)',
        eligibility: '10+2 / PUC in any stream (Science, Commerce, Arts) with minimum 50% aggregate.',
        fees: 75000.0,
        available_seats: 60,
        created_at: now,
      },
      {
        id: 3,
        name: 'B.Com (Bachelor of Commerce)',
        description: 'In-depth coverage of financial accounting, corporate taxation, auditing, banking, and business regulatory frameworks.',
        duration: '3 Years (6 Semesters)',
        eligibility: '10+2 / PUC with Commerce/Accountancy background with minimum 50% aggregate.',
        fees: 65000.0,
        available_seats: 80,
        created_at: now,
      },
      {
        id: 4,
        name: 'B.Sc Computer Science',
        description: 'Rigorous scientific curriculum emphasizing algorithmic computing, AI systems, data structures, and mathematical modeling.',
        duration: '3 Years (6 Semesters)',
        eligibility: '10+2 / PUC with Physics, Chemistry, and Mathematics (PCM) with minimum 55% aggregate.',
        fees: 90000.0,
        available_seats: 45,
        created_at: now,
      },
      {
        id: 5,
        name: 'B.Tech Computer Science & Engineering',
        description: 'Premier 4-year engineering degree encompassing full-stack systems, distributed computing, cloud computing, and machine learning.',
        duration: '4 Years (8 Semesters)',
        eligibility: '10+2 with PCM (minimum 60% aggregate) or valid CET/COMEDK entrance rank.',
        fees: 175000.0,
        available_seats: 120,
        created_at: now,
      },
    ];
    this.nextCourseId = 6;

    // 3. Seed Students
    this.students = [
      {
        id: this.nextStudentId++,
        user_id: 2,
        phone: '9876543210',
        date_of_birth: '2004-05-15',
        gender: 'Male',
        address: '12th Cross, Indiranagar, Bangalore - 560038',
        previous_qualification: '12th Standard / PUC (Science - PCMC)',
        previous_institution: 'National Pre-University College, Bangalore',
        percentage: 88.5,
        created_at: now,
      },
      {
        id: this.nextStudentId++,
        user_id: 3,
        phone: '9876543211',
        date_of_birth: '2004-08-22',
        gender: 'Female',
        address: '4th Main, Malleshwaram, Bangalore - 560003',
        previous_qualification: '12th Standard / PUC (Commerce)',
        previous_institution: 'MES Pre-University College, Bangalore',
        percentage: 92.0,
        created_at: now,
      },
      {
        id: this.nextStudentId++,
        user_id: 4,
        phone: '9876543212',
        date_of_birth: '2003-12-10',
        gender: 'Female',
        address: '88 Tech Enclave, Whitefield, Bangalore - 560066',
        previous_qualification: '12th Standard / CBSE (PCM)',
        previous_institution: 'Delhi Public School, Bangalore East',
        percentage: 94.2,
        created_at: now,
      },
    ];

    // 4. Seed Applications & History
    this.applications = [
      {
        id: this.nextAppId++,
        student_id: 1,
        course_id: 5,
        application_number: 'PTGC-2026-1001',
        status: 'UNDER_REVIEW',
        remarks: '12th marksheet verified. Awaiting entrance scorecard verification.',
        submitted_at: '2026-08-20T10:30:00Z',
        updated_at: '2026-08-22T14:15:00Z',
      },
      {
        id: this.nextAppId++,
        student_id: 2,
        course_id: 1,
        application_number: 'PTGC-2026-1002',
        status: 'APPROVED',
        remarks: 'Provisional Admission Confirmed. Merit Rank #14. Fee payment link generated.',
        submitted_at: '2026-08-18T09:00:00Z',
        updated_at: '2026-08-21T11:00:00Z',
      },
      {
        id: this.nextAppId++,
        student_id: 3,
        course_id: 5,
        application_number: 'PTGC-2026-1003',
        status: 'PENDING',
        remarks: 'Application submitted successfully. Under preliminary document screening.',
        submitted_at: '2026-08-25T16:45:00Z',
        updated_at: '2026-08-25T16:45:00Z',
      },
    ];

    this.history = [
      { id: this.nextHistoryId++, application_id: 1, old_status: null, new_status: 'PENDING', remarks: 'Online Application Submitted', changed_at: '2026-08-20T10:30:00Z' },
      { id: this.nextHistoryId++, application_id: 1, old_status: 'PENDING', new_status: 'UNDER_REVIEW', remarks: 'Under Review by Admissions Committee', changed_at: '2026-08-22T14:15:00Z' },
      { id: this.nextHistoryId++, application_id: 2, old_status: null, new_status: 'PENDING', remarks: 'Online Application Submitted', changed_at: '2026-08-18T09:00:00Z' },
      { id: this.nextHistoryId++, application_id: 2, old_status: 'PENDING', new_status: 'UNDER_REVIEW', remarks: 'Documents Verified', changed_at: '2026-08-19T10:00:00Z' },
      { id: this.nextHistoryId++, application_id: 2, old_status: 'UNDER_REVIEW', new_status: 'APPROVED', remarks: 'Provisional Admission Granted', changed_at: '2026-08-21T11:00:00Z' },
      { id: this.nextHistoryId++, application_id: 3, old_status: null, new_status: 'PENDING', remarks: 'Online Application Submitted', changed_at: '2026-08-25T16:45:00Z' },
    ];
  }

  // Simulated SQL query dispatcher for in-memory operations
  execute(sql: string, params: any[] = []): any {
    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    // 1. SELECT COUNT queries
    if (upper.startsWith('SELECT COUNT(*)')) {
      if (upper.includes('FROM STUDENTS')) {
        return [[{ count: this.students.length }], []];
      }
      if (upper.includes('FROM ADMISSION_APPLICATIONS')) {
        if (upper.includes('STATUS = "PENDING"') || (upper.includes('STATUS = ?') && params[0] === 'PENDING')) {
          return [[{ count: this.applications.filter(a => a.status === 'PENDING').length }], []];
        }
        if (upper.includes('STATUS = "UNDER_REVIEW"') || (upper.includes('STATUS = ?') && params[0] === 'UNDER_REVIEW')) {
          return [[{ count: this.applications.filter(a => a.status === 'UNDER_REVIEW').length }], []];
        }
        if (upper.includes('STATUS = "APPROVED"') || (upper.includes('STATUS = ?') && params[0] === 'APPROVED')) {
          return [[{ count: this.applications.filter(a => a.status === 'APPROVED').length }], []];
        }
        if (upper.includes('STATUS = "REJECTED"') || (upper.includes('STATUS = ?') && params[0] === 'REJECTED')) {
          return [[{ count: this.applications.filter(a => a.status === 'REJECTED').length }], []];
        }
        return [[{ count: this.applications.length }], []];
      }
      if (upper.includes('FROM COURSES')) {
        return [[{ count: this.courses.length }], []];
      }
      if (upper.includes('FROM USERS')) {
        return [[{ count: this.users.length }], []];
      }
    }

    // 2. USERS Queries
    if (upper.includes('FROM USERS') && upper.startsWith('SELECT')) {
      if (upper.includes('WHERE EMAIL = ?')) {
        const email = String(params[0] || '').toLowerCase();
        const found = this.users.filter(u => u.email.toLowerCase() === email);
        return [found, []];
      }
      if (upper.includes('WHERE ID = ?')) {
        const id = Number(params[0]);
        const found = this.users.filter(u => u.id === id);
        return [found, []];
      }
      return [this.users, []];
    }

    if (upper.startsWith('INSERT INTO USERS')) {
      const [name, email, password_hash, role, phone] = params;
      const newUser: MemUser = {
        id: this.nextUserId++,
        name,
        email: String(email).toLowerCase(),
        password_hash,
        role: role || 'student',
        phone: phone || '',
        created_at: new Date().toISOString(),
      };
      this.users.push(newUser);
      return [{ insertId: newUser.id, affectedRows: 1 }, []];
    }

    if (upper.startsWith('UPDATE USERS')) {
      // e.g. UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?
      const [name, phone, userId] = params;
      const user = this.users.find(u => u.id === Number(userId));
      if (user) {
        if (name) user.name = name;
        if (phone) user.phone = phone;
      }
      return [{ affectedRows: user ? 1 : 0 }, []];
    }

    // 3. COURSES Queries
    if (upper.includes('FROM COURSES') && upper.startsWith('SELECT')) {
      if (upper.includes('WHERE ID = ?')) {
        const id = Number(params[0]);
        const found = this.courses.filter(c => c.id === id);
        return [found, []];
      }
      return [this.courses, []];
    }

    // 4. STUDENTS Queries
    if (upper.includes('FROM STUDENTS S') && upper.includes('JOIN USERS U') && upper.includes('WHERE U.ID = ?')) {
      const userId = Number(params[0]);
      const student = this.students.find(s => s.user_id === userId);
      const user = this.users.find(u => u.id === userId);
      if (!student || !user) {
        return [[], []];
      }
      return [
        [
          {
            student_id: student.id,
            user_id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: student.phone || user.phone || '',
            date_of_birth: student.date_of_birth,
            gender: student.gender,
            address: student.address,
            previous_qualification: student.previous_qualification,
            previous_institution: student.previous_institution,
            percentage: student.percentage,
            created_at: student.created_at,
          },
        ],
        [],
      ];
    }

    if (upper.includes('FROM STUDENTS') && upper.startsWith('SELECT')) {
      if (upper.includes('WHERE USER_ID = ?')) {
        const userId = Number(params[0]);
        const found = this.students.filter(s => s.user_id === userId);
        return [found, []];
      }
      if (upper.includes('WHERE ID = ?')) {
        const id = Number(params[0]);
        const found = this.students.filter(s => s.id === id);
        return [found, []];
      }

      // Admin students query with search
      let result = this.students.map(s => {
        const u = this.users.find(usr => usr.id === s.user_id) || { name: 'Unknown', email: '' };
        const apps = this.applications.filter(a => a.student_id === s.id);
        const lastApp = apps[apps.length - 1];
        const course = lastApp ? this.courses.find(c => c.id === lastApp.course_id) : null;

        return {
          id: s.id,
          user_id: s.user_id,
          name: u.name,
          email: u.email,
          phone: s.phone || '',
          date_of_birth: s.date_of_birth,
          gender: s.gender,
          address: s.address,
          previous_qualification: s.previous_qualification,
          previous_institution: s.previous_institution,
          percentage: s.percentage,
          created_at: s.created_at,
          course_name: course ? course.name : null,
          application_status: lastApp ? lastApp.status : null,
          application_number: lastApp ? lastApp.application_number : null,
        };
      });

      if (params.length > 0 && typeof params[0] === 'string' && params[0].startsWith('%')) {
        const search = params[0].replace(/%/g, '').toLowerCase();
        result = result.filter(
          r =>
            r.name.toLowerCase().includes(search) ||
            r.email.toLowerCase().includes(search) ||
            (r.phone && r.phone.toLowerCase().includes(search)) ||
            (r.previous_institution && r.previous_institution.toLowerCase().includes(search))
        );
      }

      return [result, []];
    }

    if (upper.startsWith('INSERT INTO STUDENTS')) {
      if (params.length === 1) {
        // [userId]
        const newStudent: MemStudent = {
          id: this.nextStudentId++,
          user_id: Number(params[0]),
          created_at: new Date().toISOString(),
        };
        this.students.push(newStudent);
        return [{ insertId: newStudent.id, affectedRows: 1 }, []];
      }
      if (params.length === 2) {
        // [userId, phone]
        const newStudent: MemStudent = {
          id: this.nextStudentId++,
          user_id: Number(params[0]),
          phone: params[1] || '',
          created_at: new Date().toISOString(),
        };
        this.students.push(newStudent);
        return [{ insertId: newStudent.id, affectedRows: 1 }, []];
      }
      // Full student insert
      const [userId, phone, dob, gender, address, prevQual, prevInst, pct] = params;
      const newStudent: MemStudent = {
        id: this.nextStudentId++,
        user_id: Number(userId),
        phone: phone || '',
        date_of_birth: dob || null,
        gender: gender || null,
        address: address || null,
        previous_qualification: prevQual || null,
        previous_institution: prevInst || null,
        percentage: pct !== null && pct !== undefined ? Number(pct) : null,
        created_at: new Date().toISOString(),
      };
      this.students.push(newStudent);
      return [{ insertId: newStudent.id, affectedRows: 1 }, []];
    }

    if (upper.startsWith('UPDATE STUDENTS')) {
      const [phone, dob, gender, address, prevQual, prevInst, pct, userId] = params;
      const student = this.students.find(s => s.user_id === Number(userId));
      if (student) {
        if (phone !== null && phone !== undefined) student.phone = phone;
        if (dob !== null && dob !== undefined) student.date_of_birth = dob;
        if (gender !== null && gender !== undefined) student.gender = gender;
        if (address !== null && address !== undefined) student.address = address;
        if (prevQual !== null && prevQual !== undefined) student.previous_qualification = prevQual;
        if (prevInst !== null && prevInst !== undefined) student.previous_institution = prevInst;
        if (pct !== null && pct !== undefined) student.percentage = Number(pct);
      }
      return [{ affectedRows: student ? 1 : 0 }, []];
    }

    // 5. APPLICATIONS Queries
    if (upper.includes('FROM ADMISSION_APPLICATIONS A') && upper.includes('WHERE S.USER_ID = ?')) {
      const userId = Number(params[0]);
      const student = this.students.find(s => s.user_id === userId);
      if (!student) return [[], []];

      const apps = this.applications.filter(a => a.student_id === student.id);
      const rows = apps.map(a => {
        const course = this.courses.find(c => c.id === a.course_id);
        return {
          id: a.id,
          student_id: a.student_id,
          course_id: a.course_id,
          application_number: a.application_number,
          status: a.status,
          remarks: a.remarks,
          submitted_at: a.submitted_at,
          updated_at: a.updated_at,
          course_name: course?.name || 'Academic Program',
          course_duration: course?.duration || '',
          course_fees: course?.fees || 0,
        };
      });
      return [rows, []];
    }

    if (upper.includes('FROM ADMISSION_APPLICATIONS A') && upper.includes('WHERE A.ID = ?')) {
      const appId = Number(params[0]);
      const app = this.applications.find(a => a.id === appId);
      if (!app) return [[], []];

      const student = this.students.find(s => s.id === app.student_id);
      const user = student ? this.users.find(u => u.id === student.user_id) : null;
      const course = this.courses.find(c => c.id === app.course_id);

      return [
        [
          {
            id: app.id,
            student_id: app.student_id,
            course_id: app.course_id,
            application_number: app.application_number,
            status: app.status,
            remarks: app.remarks,
            submitted_at: app.submitted_at,
            updated_at: app.updated_at,
            user_id: user?.id,
            student_name: user?.name,
            email: user?.email,
            phone: student?.phone || user?.phone || '',
            date_of_birth: student?.date_of_birth,
            gender: student?.gender,
            address: student?.address,
            previous_qualification: student?.previous_qualification,
            previous_institution: student?.previous_institution,
            percentage: student?.percentage,
            course_name: course?.name,
            course_duration: course?.duration,
            course_fees: course?.fees,
            course_eligibility: course?.eligibility,
          },
        ],
        [],
      ];
    }

    if (upper.includes('FROM ADMISSION_APPLICATIONS') && upper.startsWith('SELECT')) {
      if (upper.includes('WHERE STUDENT_ID = ? AND COURSE_ID = ?')) {
        const [studentId, courseId] = params;
        const found = this.applications.filter(
          a => a.student_id === Number(studentId) && a.course_id === Number(courseId) && ['PENDING', 'UNDER_REVIEW', 'APPROVED'].includes(a.status)
        );
        return [found, []];
      }
      if (upper.includes('WHERE ID = ?')) {
        const appId = Number(params[0]);
        const found = this.applications.filter(a => a.id === appId);
        return [found, []];
      }

      // Admin all applications query
      let rows = this.applications.map(a => {
        const student = this.students.find(s => s.id === a.student_id);
        const user = student ? this.users.find(u => u.id === student.user_id) : null;
        const course = this.courses.find(c => c.id === a.course_id);

        return {
          id: a.id,
          student_id: a.student_id,
          course_id: a.course_id,
          application_number: a.application_number,
          status: a.status,
          remarks: a.remarks,
          submitted_at: a.submitted_at,
          updated_at: a.updated_at,
          student_name: user?.name || 'Applicant',
          email: user?.email || '',
          phone: student?.phone || user?.phone || '',
          percentage: student?.percentage || null,
          previous_qualification: student?.previous_qualification || '',
          previous_institution: student?.previous_institution || '',
          course_name: course?.name || '',
          course_fees: course?.fees || 0,
          course_duration: course?.duration || '',
        };
      });

      // Filter by status if provided in params
      for (const p of params) {
        if (typeof p === 'string' && ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].includes(p)) {
          rows = rows.filter(r => r.status === p);
        } else if (typeof p === 'number') {
          rows = rows.filter(r => r.course_id === p);
        } else if (typeof p === 'string' && p.startsWith('%')) {
          const s = p.replace(/%/g, '').toLowerCase();
          rows = rows.filter(
            r =>
              r.student_name.toLowerCase().includes(s) ||
              r.email.toLowerCase().includes(s) ||
              r.application_number.toLowerCase().includes(s) ||
              r.phone.toLowerCase().includes(s)
          );
        }
      }

      return [rows, []];
    }

    if (upper.startsWith('INSERT INTO ADMISSION_APPLICATIONS')) {
      const [studentId, courseId, appNumber, remarks] = params;
      const newApp: MemApplication = {
        id: this.nextAppId++,
        student_id: Number(studentId),
        course_id: Number(courseId),
        application_number: appNumber,
        status: 'PENDING',
        remarks: remarks || 'Online Application Submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.applications.push(newApp);
      return [{ insertId: newApp.id, affectedRows: 1 }, []];
    }

    if (upper.startsWith('UPDATE ADMISSION_APPLICATIONS')) {
      const [status, remarks, appId] = params;
      const app = this.applications.find(a => a.id === Number(appId));
      if (app) {
        app.status = status;
        app.remarks = remarks || app.remarks;
        app.updated_at = new Date().toISOString();
      }
      return [{ affectedRows: app ? 1 : 0 }, []];
    }

    // 6. HISTORY Queries
    if (upper.includes('FROM APPLICATION_STATUS_HISTORY') && upper.startsWith('SELECT')) {
      const appId = Number(params[0]);
      const found = this.history.filter(h => h.application_id === appId);
      return [found, []];
    }

    if (upper.startsWith('INSERT INTO APPLICATION_STATUS_HISTORY')) {
      const [appId, oldStatus, newStatus, remarks] = params;
      const item: MemHistory = {
        id: this.nextHistoryId++,
        application_id: Number(appId),
        old_status: oldStatus || null,
        new_status: newStatus,
        remarks: remarks || '',
        changed_at: new Date().toISOString(),
      };
      this.history.push(item);
      return [{ insertId: item.id, affectedRows: 1 }, []];
    }

    // Fallback default
    return [[], []];
  }
}

export const memoryDb = new MemoryDatabase();

/**
 * Automatically creates all tables and seeds default records if MySQL is connected.
 */
export async function initializeDatabaseSchema(): Promise<void> {
  if (!isMySqlConnected) return;

  try {
    // 1. users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('student', 'admin') NOT NULL DEFAULT 'student',
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_users_email (email),
        INDEX idx_users_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        phone VARCHAR(50),
        date_of_birth DATE,
        gender VARCHAR(20),
        address TEXT,
        previous_qualification VARCHAR(100),
        previous_institution VARCHAR(255),
        percentage DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_students_user (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. courses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        duration VARCHAR(50) NOT NULL,
        eligibility TEXT NOT NULL,
        fees DECIMAL(10,2) NOT NULL,
        available_seats INT NOT NULL DEFAULT 60,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. admission_applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admission_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        course_id INT NOT NULL,
        application_number VARCHAR(50) NOT NULL UNIQUE,
        status ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
        remarks TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
        INDEX idx_applications_student (student_id),
        INDEX idx_applications_course (course_id),
        INDEX idx_applications_status (status),
        INDEX idx_applications_app_number (application_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. application_status_history table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS application_status_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        old_status VARCHAR(50),
        new_status VARCHAR(50) NOT NULL,
        remarks TEXT,
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (application_id) REFERENCES admission_applications(id) ON DELETE CASCADE,
        INDEX idx_history_application (application_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed courses if empty
    const [courses] = await pool.query<any[]>('SELECT COUNT(*) as count FROM courses');
    if (courses && courses[0]?.count === 0) {
      await pool.query(`
        INSERT INTO courses (id, name, description, duration, eligibility, fees, available_seats) VALUES
        (1, 'BCA (Bachelor of Computer Applications)', 'A comprehensive undergraduate program focusing on computer science, software engineering, web technologies, and database architecture.', '3 Years (6 Semesters)', '10+2 / PUC equivalent with Mathematics/Computer Science with minimum 50% aggregate.', 85000.00, 60),
        (2, 'BBA (Bachelor of Business Administration)', 'Equips students with modern management principles, corporate finance, marketing strategies, and entrepreneurial leadership.', '3 Years (6 Semesters)', '10+2 / PUC in any stream (Science, Commerce, Arts) with minimum 50% aggregate.', 75000.00, 60),
        (3, 'B.Com (Bachelor of Commerce)', 'In-depth coverage of financial accounting, corporate taxation, auditing, banking, and business regulatory frameworks.', '3 Years (6 Semesters)', '10+2 / PUC with Commerce/Accountancy background with minimum 50% aggregate.', 65000.00, 80),
        (4, 'B.Sc Computer Science', 'Rigorous scientific curriculum emphasizing algorithmic computing, AI systems, data structures, and mathematical modeling.', '3 Years (6 Semesters)', '10+2 / PUC with Physics, Chemistry, and Mathematics (PCM) with minimum 55% aggregate.', 90000.00, 45),
        (5, 'B.Tech Computer Science & Engineering', 'Premier 4-year engineering degree encompassing full-stack systems, distributed computing, cloud computing, and machine learning.', '4 Years (8 Semesters)', '10+2 with PCM (minimum 60% aggregate) or valid CET/COMEDK entrance rank.', 175000.00, 120);
      `);
    }

    // Seed admin if empty
    const [admins] = await pool.query<any[]>('SELECT id FROM users WHERE email = ?', ['admin@prajwaltechgo.edu']);
    if (!admins || admins.length === 0) {
      const adminPassHash = await bcrypt.hash('admin123', 10);
      await pool.query(
        `INSERT INTO users (name, email, password_hash, role, phone)
         VALUES ('Administrator', 'admin@prajwaltechgo.edu', ?, 'admin', '080-28456789')`,
        [adminPassHash]
      );
    }
  } catch (err: any) {
    console.warn('⚠️ Auto-schema initialization note:', err.message || err);
  }
}

/**
 * Test database connection.
 */
export async function testDbConnection(): Promise<boolean> {
  mysqlCheckAttempted = true;
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isMySqlConnected = true;
    initializeDatabaseSchema().catch(() => null);
    return true;
  } catch {
    isMySqlConnected = false;
    return false;
  }
}

/**
 * Execute parameterized query.
 * If MySQL is connected, runs directly on MySQL.
 * If MySQL is not reachable (e.g. ECONNREFUSED), seamlessly routes query to the MemoryDatabase store.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<[T, any]> {
  // If MySQL is confirmed offline or not yet verified, attempt memory fallback safely
  if (!isMySqlConnected) {
    if (!mysqlCheckAttempted) {
      // First try quick probe
      const ok = await testDbConnection();
      if (ok) {
        const [rows, fields] = await pool.query(sql, params);
        return [rows as T, fields];
      }
    }
    // Return from in-memory engine
    return memoryDb.execute(sql, params);
  }

  try {
    const [rows, fields] = await pool.query(sql, params);
    return [rows as T, fields];
  } catch (err: any) {
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND' || err.code === 'PROTOCOL_CONNECTION_LOST') {
      isMySqlConnected = false;
      return memoryDb.execute(sql, params);
    }
    throw err;
  }
}

export const db = {
  pool,
  query,
  testDbConnection,
  initializeDatabaseSchema,
};

export default db;
