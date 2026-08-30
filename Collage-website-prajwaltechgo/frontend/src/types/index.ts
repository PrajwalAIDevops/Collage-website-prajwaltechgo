export type UserRole = 'student' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface StudentProfile {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  previous_qualification?: string;
  previous_institution?: string;
  percentage?: number;
  course_name?: string;
  application_status?: ApplicationStatus;
  application_number?: string;
  created_at: string;
}

export type Student = StudentProfile;

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  fees: number | string;
  available_seats: number;
  created_at?: string;
}

export type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export interface AdmissionApplication {
  id: number;
  student_id: number;
  course_id: number;
  application_number: string;
  status: ApplicationStatus;
  remarks?: string;
  submitted_at: string;
  updated_at?: string;
  student_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  previous_qualification?: string;
  previous_institution?: string;
  percentage?: number;
  course_name: string;
  course_fees: number | string;
  course_duration: string;
  history?: StatusHistory[];
}

export interface StatusHistory {
  id: number;
  application_id: number;
  old_status?: string | null;
  new_status: ApplicationStatus;
  remarks?: string;
  changed_at: string;
}

export interface AdminStats {
  totalStudents: number;
  totalApplications: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  total_students?: number;
  total_applications?: number;
  pending_applications?: number;
  under_review_applications?: number;
  approved_applications?: number;
  rejected_applications?: number;
  course_stats?: Array<{
    course_id: number;
    course_name: string;
    available_seats?: number;
    applications_count: number;
  }>;
}

export interface HealthStatus {
  status: 'UP' | 'DOWN' | 'ok';
  database: 'CONNECTED' | 'DISCONNECTED';
  college?: string;
  note?: string;
}
