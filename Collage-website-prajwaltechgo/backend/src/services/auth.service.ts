import bcrypt from 'bcryptjs';
import { db } from '../config/database.js';

export interface RegisterStudentInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  previous_qualification?: string;
  previous_institution?: string;
  percentage?: number;
}

export const authService = {
  /**
   * Simple email/password login against MySQL users table
   */
  async login(email: string, password: string) {
    if (!email || !password) {
      const err: any = new Error('Email and password are required');
      err.statusCode = 400;
      throw err;
    }

    const [rows] = await db.query<any[]>(
      'SELECT id, name, email, password_hash, role, phone, created_at FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    if (!rows || rows.length === 0) {
      const err: any = new Error('Invalid email or password');
      err.statusCode = 401;
      throw err;
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      const err: any = new Error('Invalid email or password');
      err.statusCode = 401;
      throw err;
    }

    // Return safe user object (excluding password hash)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      created_at: user.created_at,
    };
  },

  /**
   * Register a new student account in MySQL
   */
  async registerStudent(data: RegisterStudentInput) {
    const {
      name,
      email,
      password,
      phone = '',
      date_of_birth = null,
      gender = '',
      address = '',
      previous_qualification = '',
      previous_institution = '',
      percentage = 0,
    } = data;

    if (!name || !email || !password) {
      const err: any = new Error('Name, email, and password are required fields');
      err.statusCode = 400;
      throw err;
    }

    if (password.length < 6) {
      const err: any = new Error('Password must be at least 6 characters in length');
      err.statusCode = 400;
      throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const [existingUsers] = await db.query<any[]>(
      'SELECT id FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (existingUsers && existingUsers.length > 0) {
      const err: any = new Error('An account with this email address already exists');
      err.statusCode = 409;
      throw err;
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user record into MySQL
    const [userResult] = await db.query<any>(
      'INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), normalizedEmail, password_hash, 'student', phone]
    );

    const userId = userResult.insertId;

    // Insert student profile record into MySQL
    const [studentResult] = await db.query<any>(
      'INSERT INTO students (user_id, phone, date_of_birth, gender, address, previous_qualification, previous_institution, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        userId,
        phone,
        date_of_birth || null,
        gender || null,
        address || null,
        previous_qualification || null,
        previous_institution || null,
        percentage || null,
      ]
    );

    return {
      id: userId,
      studentId: studentResult.insertId,
      name: name.trim(),
      email: normalizedEmail,
      role: 'student',
      phone,
    };
  },

  /**
   * Get user by ID from MySQL
   */
  async getUserById(id: number) {
    const [rows] = await db.query<any[]>(
      'SELECT id, name, email, role, phone, created_at FROM users WHERE id = ?',
      [id]
    );

    if (!rows || rows.length === 0) {
      const err: any = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    return rows[0];
  },
};

export default authService;
