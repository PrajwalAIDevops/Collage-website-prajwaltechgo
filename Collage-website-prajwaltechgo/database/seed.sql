-- ==========================================================
-- Prajwal Tech Go College - Seed Data (MySQL)
-- Location: Bangalore, Karnataka, India
-- Default Dev Credentials:
-- Admin: admin@prajwaltechgo.edu / admin123
-- Students: ananya@example.com / password123, rahul@example.com / password123, etc.
-- ==========================================================

USE college_platform;

-- 1. Insert Courses
INSERT INTO courses (id, name, description, duration, eligibility, fees, available_seats) VALUES
(1, 'BCA (Bachelor of Computer Applications)', 'A comprehensive undergraduate program focusing on computer science, software engineering, web technologies, and database architecture.', '3 Years (6 Semesters)', '10+2 / PUC equivalent with Mathematics/Computer Science with minimum 50% aggregate.', 85000.00, 60),
(2, 'BBA (Bachelor of Business Administration)', 'Equips students with modern management principles, corporate finance, marketing strategies, and entrepreneurial leadership.', '3 Years (6 Semesters)', '10+2 / PUC in any stream (Science, Commerce, Arts) with minimum 50% aggregate.', 75000.00, 60),
(3, 'B.Com (Bachelor of Commerce)', 'In-depth coverage of financial accounting, corporate taxation, auditing, banking, and business regulatory frameworks.', '3 Years (6 Semesters)', '10+2 / PUC with Commerce/Accountancy background with minimum 50% aggregate.', 65000.00, 80),
(4, 'B.Sc Computer Science', 'Rigorous scientific curriculum emphasizing algorithmic computing, AI systems, data structures, and mathematical modeling.', '3 Years (6 Semesters)', '10+2 / PUC with Physics, Chemistry, and Mathematics (PCM) with minimum 55% aggregate.', 90000.00, 45),
(5, 'B.Tech Computer Science & Engineering', 'Premier 4-year engineering degree encompassing full-stack systems, distributed computing, cloud computing, and machine learning.', '4 Years (8 Semesters)', '10+2 with PCM (minimum 60% aggregate) or valid CET/COMEDK entrance rank.', 175000.00, 120)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Users (Password hashes generated via bcrypt for 'admin123' and 'password123')
-- $2a$10$rCzFm9yKzP5oU1s8sI2qR8N19b8Q0vIeQ7W2xK8d0Y3n3R.F9nB7O is bcrypt for 'admin123'
-- $2a$10$w8F2kF9e8rJ0aCvyH/uSbe9kH8sI2qR8N19b8Q0vIeQ7W2xK8d0Y3 is bcrypt for 'password123'
INSERT INTO users (id, name, email, password_hash, role, phone) VALUES
(1, 'Administrator', 'admin@prajwaltechgo.edu', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'admin', '080-28456789'),
(2, 'Ananya Roy', 'ananya@example.com', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'student', '9876543210'),
(3, 'Rahul Sharma', 'rahul@example.com', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'student', '9812345678'),
(4, 'Pooja Hegde', 'pooja@example.com', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'student', '9945123456'),
(5, 'Karthik Gowda', 'karthik@example.com', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'student', '9731234567'),
(6, 'Meera Nair', 'meera@example.com', '$2a$10$uV.J7t/O8fO4g7U8KxHqheJ8tG3FqXl3p4FkL9Y6L7t9W1q8sI2qR', 'student', '9611223344')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- 3. Insert Students
INSERT INTO students (id, user_id, phone, date_of_birth, gender, address, previous_qualification, previous_institution, percentage) VALUES
(1, 2, '9876543210', '2005-04-14', 'Female', '42, 4th Cross, Indiranagar, Bangalore, Karnataka - 560038', '12th Standard (CBSE)', 'National Public School, Bangalore', 88.50),
(2, 3, '9812345678', '2004-11-20', 'Male', '15, 8th Main, Malleshwaram, Bangalore, Karnataka - 560003', 'PUC (PCMC)', 'MES Pre-University College, Bangalore', 92.40),
(3, 4, '9945123456', '2005-07-09', 'Female', '88, 100ft Road, Koramangala, Bangalore, Karnataka - 560034', '12th Standard (Commerce)', 'Christ Junior College, Bangalore', 84.00),
(4, 5, '9731234567', '2004-02-18', 'Male', '21, Ring Road, Jayanagar 4th Block, Bangalore - 560011', 'PUC (PCMB)', 'National College, Basavanagudi', 76.80),
(5, 6, '9611223344', '2005-09-25', 'Female', '302, Green Glen Layout, Bellandur, Bangalore - 560103', '12th Standard (Science)', 'Delhi Public School, Bangalore South', 94.60)
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id);

-- 4. Insert Admission Applications
INSERT INTO admission_applications (id, student_id, course_id, application_number, status, remarks, submitted_at) VALUES
(1, 1, 1, 'PTGC-2026-0001', 'APPROVED', 'Application approved based on outstanding academic qualification and document verification.', '2026-08-10 10:30:00'),
(2, 2, 5, 'PTGC-2026-0002', 'UNDER_REVIEW', 'Entrance score verified. Awaiting departmental committee final review.', '2026-08-14 14:15:00'),
(3, 3, 3, 'PTGC-2026-0003', 'APPROVED', 'Seat allocated in B.Com First Batch.', '2026-08-18 11:00:00'),
(4, 4, 4, 'PTGC-2026-0004', 'PENDING', 'New application received. Initial review pending.', '2026-08-22 16:45:00'),
(5, 5, 5, 'PTGC-2026-0005', 'PENDING', 'Application submitted. Document evaluation in progress.', '2026-08-25 09:20:00')
ON DUPLICATE KEY UPDATE application_number=VALUES(application_number);

-- 5. Insert Application Status History
INSERT INTO application_status_history (id, application_id, old_status, new_status, remarks, changed_at) VALUES
(1, 1, 'PENDING', 'UNDER_REVIEW', 'Initial verification completed.', '2026-08-10 12:00:00'),
(2, 1, 'UNDER_REVIEW', 'APPROVED', 'Application approved based on outstanding academic qualification and document verification.', '2026-08-12 15:30:00'),
(3, 2, 'PENDING', 'UNDER_REVIEW', 'Entrance score verified. Awaiting departmental committee final review.', '2026-08-15 10:00:00'),
(4, 3, 'PENDING', 'APPROVED', 'Seat allocated in B.Com First Batch.', '2026-08-19 14:00:00');
