import {
  User,
  StudentProfile,
  Student,
  Course,
  AdmissionApplication,
  StatusHistory,
  AdminStats,
  HealthStatus,
  ApplicationStatus,
} from '../types/index.js';

let cachedApiBase: string | null = null;

function getCandidateBases(): string[] {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const envUrl = (metaEnv.VITE_API_URL || metaEnv.VITE_API_BASE_URL || '') as string;
  const list: string[] = [];

  if (envUrl) {
    list.push(envUrl.replace(/\/$/, ''));
  }

  // 1. Same-origin relative /api
  list.push('/api');

  // 2. Multi-port detection for Docker & Local environments (8081, 5000, 3000)
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;

    // Backend candidate ports
    const candidatePorts = ['8081', '5000', '3000'];
    for (const p of candidatePorts) {
      if (p !== port) {
        list.push(`${protocol}//${hostname}:${p}/api`);
        if (hostname !== 'localhost') {
          list.push(`${protocol}//localhost:${p}/api`);
        }
        if (hostname !== '127.0.0.1') {
          list.push(`${protocol}//127.0.0.1:${p}/api`);
        }
      }
    }
  }

  return Array.from(new Set(list));
}

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If we already established a working API base, attempt that first
  if (cachedApiBase) {
    try {
      const res = await fetch(`${cachedApiBase}${cleanEndpoint}`, options);
      const contentType = res.headers.get('content-type') || '';
      const isHtmlSpaFallback = contentType.includes('text/html');

      // If it's a genuine API response (JSON or standard HTTP status without HTML fallback)
      if (!isHtmlSpaFallback) {
        return res;
      }
      // If it returned HTML SPA fallback, invalidate cache
      cachedApiBase = null;
    } catch {
      cachedApiBase = null;
    }
  }

  const bases = getCandidateBases();
  let lastValidApiResponse: Response | null = null;
  let lastError: any = null;

  for (const base of bases) {
    try {
      const url = `${base}${cleanEndpoint}`;
      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type') || '';
      const isHtmlSpa = contentType.includes('text/html');

      // If response is JSON from an API server (even 400, 401, 404, 409, 500), it's a real API response!
      if (!isHtmlSpa && (contentType.includes('application/json') || res.status < 400)) {
        cachedApiBase = base;
        return res;
      }

      // If it's not HTML, keep as candidate
      if (!isHtmlSpa) {
        lastValidApiResponse = res;
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (lastValidApiResponse) return lastValidApiResponse;
  throw (
    lastError ||
    new Error(
      'Unable to connect to the Prajwal Tech Go College API server. Please ensure the backend server is running.'
    )
  );
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error(
      'API server endpoint not found (returned HTML). Please ensure the backend is running and reachable.'
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      data.error ||
      data.message ||
      (res.status === 401
        ? 'Invalid email or password'
        : res.status === 404
        ? 'Requested record not found'
        : `Request failed with status ${res.status}`);
    throw new Error(errorMsg);
  }
  return data;
}

export const api = {
  // Health Check
  async getHealth(): Promise<HealthStatus> {
    const res = await apiFetch('/health');
    return handleResponse<HealthStatus>(res);
  },

  // Auth - Register
  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
  }): Promise<{ success: boolean; user: User; message: string }> {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
  }): Promise<{ success: boolean; user: User; message: string }> {
    return this.registerUser(data);
  },

  // Auth - Login
  async loginUser(data: { email: string; password: string }): Promise<{ success: boolean; user: User }> {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async login(email: string, password: string): Promise<{ success: boolean; user: User }> {
    return this.loginUser({ email, password });
  },

  // Courses
  async getCourses(): Promise<{ success: boolean; courses: Course[]; data?: Course[] }> {
    const res = await apiFetch('/courses');
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      courses: result.courses || result.data || [],
      data: result.courses || result.data || [],
    };
  },

  async getCourseById(id: number): Promise<{ success: boolean; course: Course; data?: Course }> {
    const res = await apiFetch(`/courses/${id}`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      course: result.course || result.data,
      data: result.course || result.data,
    };
  },

  // Students
  async getStudents(search?: string): Promise<{ success: boolean; students: Student[]; data?: Student[] }> {
    const params = new URLSearchParams();
    if (search && search.trim()) params.append('search', search.trim());
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiFetch(`/admin/students${queryStr}`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      students: result.students || result.data || [],
      data: result.students || result.data || [],
    };
  },

  async getProfile(userId: number): Promise<{ success: boolean; profile: Student; data?: Student }> {
    const res = await apiFetch(`/students/profile/${userId}`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      profile: result.profile || result.data,
      data: result.profile || result.data,
    };
  },

  async getStudentById(userId: number): Promise<{ success: boolean; profile: Student; data?: Student }> {
    return this.getProfile(userId);
  },

  async updateProfile(
    userId: number,
    data: {
      phone?: string;
      date_of_birth?: string;
      gender?: string;
      address?: string;
      previous_qualification?: string;
      previous_institution?: string;
      percentage?: number;
    }
  ): Promise<{ success: boolean; message: string; profile: Student; data?: Student }> {
    const res = await apiFetch(`/students/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      message: result.message,
      profile: result.profile || result.data,
      data: result.profile || result.data,
    };
  },

  async updateStudentProfile(
    userId: number,
    data: {
      phone?: string;
      date_of_birth?: string;
      gender?: string;
      address?: string;
      previous_qualification?: string;
      previous_institution?: string;
      percentage?: number;
    }
  ): Promise<{ success: boolean; message: string; profile: Student; data?: Student }> {
    return this.updateProfile(userId, data);
  },

  // Admissions
  async submitAdmission(data: {
    userId?: number;
    student_id?: number;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    previous_qualification?: string;
    previous_institution?: string;
    percentage?: number;
    course_id: number;
    remarks?: string;
  }): Promise<{ success: boolean; message: string; application: AdmissionApplication; data?: AdmissionApplication }> {
    const payload = {
      user_id: data.userId || data.student_id,
      course_id: data.course_id,
      remarks: data.remarks,
    };

    // First update student profile details if provided
    const uId = data.userId || data.student_id;
    if (uId) {
      await this.updateProfile(uId, {
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        address: data.address,
        previous_qualification: data.previous_qualification,
        previous_institution: data.previous_institution,
        percentage: data.percentage,
      }).catch(() => null);
    }

    const res = await apiFetch('/admissions/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      message: result.message,
      application: result.application || result.data,
      data: result.application || result.data,
    };
  },

  async submitApplication(data: {
    student_id?: number;
    userId?: number;
    course_id: number;
    previous_qualification?: string;
    previous_institution?: string;
    percentage?: number;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    remarks?: string;
  }): Promise<{ success: boolean; message: string; application: AdmissionApplication; data?: AdmissionApplication }> {
    return this.submitAdmission(data);
  },

  async getMyApplications(userId: number): Promise<{ success: boolean; applications: AdmissionApplication[]; data?: AdmissionApplication[] }> {
    const res = await apiFetch(`/students/user/${userId}/applications`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      applications: result.applications || result.data || [],
      data: result.applications || result.data || [],
    };
  },

  async getMyApplication(userId: number): Promise<{ success: boolean; data: AdmissionApplication[]; applications: AdmissionApplication[] }> {
    const res = await this.getMyApplications(userId);
    return {
      success: res.success,
      data: res.applications,
      applications: res.applications,
    };
  },

  async getAdmissions(status?: string, search?: string): Promise<{ success: boolean; applications: AdmissionApplication[]; data?: AdmissionApplication[] }> {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.append('status', status);
    if (search && search.trim()) params.append('search', search.trim());

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiFetch(`/admin/applications${queryStr}`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      applications: result.applications || result.data || [],
      data: result.applications || result.data || [],
    };
  },

  async getApplications(status?: string, search?: string): Promise<{ success: boolean; applications: AdmissionApplication[]; data?: AdmissionApplication[] }> {
    return this.getAdmissions(status, search);
  },

  async getAdmissionById(id: number): Promise<{ success: boolean; application: AdmissionApplication; data?: AdmissionApplication; history: StatusHistory[] }> {
    const res = await apiFetch(`/admissions/${id}`);
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      application: result.application || result.data,
      data: result.application || result.data,
      history: result.application?.history || result.history || [],
    };
  },

  async getApplicationById(id: number): Promise<{ success: boolean; application: AdmissionApplication; data?: AdmissionApplication; history: StatusHistory[] }> {
    return this.getAdmissionById(id);
  },

  async updateAdmissionStatus(
    id: number,
    status: ApplicationStatus,
    remarks?: string
  ): Promise<{ success: boolean; message: string; application: AdmissionApplication; data?: AdmissionApplication }> {
    const res = await apiFetch(`/admin/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, remarks }),
    });
    const result = await handleResponse<any>(res);
    return {
      success: result.success,
      message: result.message,
      application: result.application || result.data,
      data: result.application || result.data,
    };
  },

  async updateApplicationStatus(
    id: number,
    status: ApplicationStatus,
    remarks?: string
  ): Promise<{ success: boolean; message: string; application: AdmissionApplication; data?: AdmissionApplication }> {
    return this.updateAdmissionStatus(id, status, remarks);
  },

  // Admin Stats
  async getAdminStats(): Promise<{ success: boolean; stats: AdminStats; data?: AdminStats }> {
    const res = await apiFetch('/admin/stats');
    const result = await handleResponse<any>(res);
    const raw = result.stats || result.data || {};
    const stats: AdminStats = {
      totalStudents: raw.totalStudents ?? raw.total_students ?? 0,
      totalApplications: raw.totalApplications ?? raw.total_applications ?? 0,
      pending: raw.pending ?? raw.pending_applications ?? 0,
      underReview: raw.underReview ?? raw.under_review_applications ?? 0,
      approved: raw.approved ?? raw.approved_applications ?? 0,
      rejected: raw.rejected ?? raw.rejected_applications ?? 0,
      total_students: raw.total_students ?? raw.totalStudents ?? 0,
      total_applications: raw.total_applications ?? raw.totalApplications ?? 0,
      pending_applications: raw.pending_applications ?? raw.pending ?? 0,
      under_review_applications: raw.under_review_applications ?? raw.underReview ?? 0,
      approved_applications: raw.approved_applications ?? raw.approved ?? 0,
      rejected_applications: raw.rejected_applications ?? raw.rejected ?? 0,
    };
    return { success: result.success, stats, data: stats };
  },
};

export default api;
