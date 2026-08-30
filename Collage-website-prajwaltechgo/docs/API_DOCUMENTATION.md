# Prajwal Tech Go College - REST API Documentation

**Location:** Bangalore, Karnataka, India  
**Affiliation:** Bengaluru City University | AICTE Approved | NAAC 'A+' Accredited  
**Base URL:** `http://localhost:3000/api`

---

## 1. Authentication APIs (`/api/auth`)

### 1.1 Register Student Account
Creates a user login account and associated student record.

- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Rohan Deshmukh",
  "email": "rohan@example.com",
  "password": "password123",
  "phone": "9876543210",
  "date_of_birth": "2006-05-14",
  "gender": "Male",
  "address": "45, 2nd Cross, Indiranagar, Bangalore, Karnataka - 560038"
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": 4,
    "email": "rohan@example.com",
    "role": "student",
    "name": "Rohan Deshmukh"
  }
}
```
- **Errors:** `400 Bad Request` (Validation failure / Email already registered).

---

### 1.2 User Login
Authenticates an Admin or Student using email and bcrypt-hashed password.

- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "admin@prajwaltechgo.edu",
  "password": "admin123"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "email": "admin@prajwaltechgo.edu",
    "role": "admin",
    "name": "Dr. K. S. Venkatesh"
  }
}
```
- **Errors:** `401 Unauthorized` (Invalid email or password).

---

## 2. Courses APIs (`/api/courses`)

### 2.1 Get All Academic Courses
Returns the catalog of degree courses, duration, fees, eligibility criteria, and available intake seats.

- **Method:** `GET`
- **Endpoint:** `/api/courses`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Bachelor of Computer Applications (BCA)",
      "description": "3-Year undergraduate program focusing on software engineering, cloud computing, and full-stack development in Bangalore's tech ecosystem.",
      "duration": "3 Years",
      "fees": "85000.00",
      "eligibility": "10+2 / PUC equivalent with Mathematics or Computer Science (Min 50% aggregate)",
      "available_seats": 120,
      "created_at": "2026-08-28T04:45:00.000Z"
    }
  ]
}
```

---

### 2.2 Get Course by ID
- **Method:** `GET`
- **Endpoint:** `/api/courses/:id`
- **Response `200 OK`:** Single course object.
- **Errors:** `404 Not Found`.

---

## 3. Student APIs (`/api/students`)

### 3.1 Get All Students (Admin Registry)
- **Method:** `GET`
- **Endpoint:** `/api/students`
- **Response `200 OK`:** Array of all registered students with contact and demographic details.

---

### 3.2 Get Student by ID
- **Method:** `GET`
- **Endpoint:** `/api/students/:id`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "user_id": 2,
    "name": "Ananya Sharma",
    "email": "ananya@example.com",
    "phone": "9876543210",
    "date_of_birth": "2006-04-12",
    "gender": "Female",
    "address": "12, 4th Main, Indiranagar, Bangalore, Karnataka - 560038",
    "created_at": "2026-08-28T04:45:00.000Z"
  }
}
```

---

### 3.3 Update Student Profile
- **Method:** `PUT`
- **Endpoint:** `/api/students/:id`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "phone": "9888877766",
  "date_of_birth": "2006-04-12",
  "gender": "Female",
  "address": "Updated Residence Address, Bangalore"
}
```
- **Response `200 OK`:** Updated student record.

---

## 4. Admission Applications APIs (`/api/admissions`)

### 4.1 Submit New Admission Application
- **Method:** `POST`
- **Endpoint:** `/api/admissions`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "student_id": 2,
  "course_id": 1,
  "previous_qualification": "Karnataka PUC Science (PCMC)",
  "previous_institution": "National Junior College, Bangalore",
  "percentage": 88.50
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "application_number": "PTGC-2026-0001",
    "student_id": 2,
    "course_id": 1,
    "previous_qualification": "Karnataka PUC Science (PCMC)",
    "previous_institution": "National Junior College, Bangalore",
    "percentage": "88.50",
    "status": "PENDING",
    "remarks": null,
    "submitted_at": "2026-08-28T04:45:00.000Z"
  }
}
```

---

### 4.2 Get All Applications (Admin View)
- **Method:** `GET`
- **Endpoint:** `/api/admissions`
- **Response `200 OK`:** Full list of applications joined with student names, contact emails, and course details.

---

### 4.3 Get Student's Own Applications
- **Method:** `GET`
- **Endpoint:** `/api/admissions/student/:studentId`
- **Response `200 OK`:** List of applications submitted by specific student.

---

### 4.4 Get Application Details and Status History
- **Method:** `GET`
- **Endpoint:** `/api/admissions/:id`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "application_number": "PTGC-2026-0001",
    "student_id": 2,
    "course_id": 1,
    "student_name": "Ananya Sharma",
    "email": "ananya@example.com",
    "course_name": "Bachelor of Computer Applications (BCA)",
    "status": "APPROVED",
    "remarks": "Eligibility and 10+2 marks verified. Provisional admission granted.",
    "history": [
      {
        "id": 1,
        "application_id": 1,
        "old_status": null,
        "new_status": "PENDING",
        "changed_by": 2,
        "remarks": "Application submitted",
        "changed_at": "2026-08-28T04:45:00.000Z"
      },
      {
        "id": 2,
        "application_id": 1,
        "old_status": "PENDING",
        "new_status": "APPROVED",
        "changed_by": 1,
        "remarks": "Eligibility and 10+2 marks verified. Provisional admission granted.",
        "changed_at": "2026-08-28T04:50:00.000Z"
      }
    ]
  }
}
```

---

### 4.5 Update Application Status (Admin Action)
- **Method:** `PUT`
- **Endpoint:** `/api/admissions/:id/status`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "status": "APPROVED",
  "remarks": "Verified 10+2 marks card. Seat allocated under Merit Category."
}
```
- **Allowed Statuses:** `PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`.
- **Response `200 OK`:** Returns updated application with timestamped history log.

---

## 5. Admin Dashboard Statistics API (`/api/admin/stats`)

### 5.1 Aggregate Real-Time Admission Metrics
- **Method:** `GET`
- **Endpoint:** `/api/admin/stats`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "total_students": 3,
    "total_applications": 3,
    "pending_applications": 0,
    "under_review_applications": 1,
    "approved_applications": 1,
    "rejected_applications": 1,
    "course_stats": [
      {
        "course_id": 1,
        "course_name": "Bachelor of Computer Applications (BCA)",
        "available_seats": 120,
        "applications_count": 1
      },
      {
        "course_id": 5,
        "course_name": "B.Tech Computer Science & Engineering",
        "available_seats": 180,
        "applications_count": 1
      }
    ]
  }
}
```

---

## 6. System Health Check (`/api/health`)
- **Method:** `GET`
- **Endpoint:** `/api/health`
- **Response `200 OK`:**
```json
{
  "status": "ok",
  "college": "Prajwal Tech Go College, Bangalore, Karnataka, India",
  "database": "CONNECTED",
  "timestamp": "2026-08-28T05:00:00.000Z"
}
```
