-- =====================================================
-- Academic Management System - Database Setup Script
-- =====================================================
-- Database: academic_db
-- Date: 25 November 2025
-- =====================================================

USE academic_db;

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS specialisation_course;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS specialisation;
DROP TABLE IF EXISTS users;

-- =====================================================
-- Table: users
-- =====================================================
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role VARCHAR(50),
    provider VARCHAR(50),
    provider_id VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: courses
-- =====================================================
CREATE TABLE courses (
    course_id INT NOT NULL,
    course_code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    term VARCHAR(30),
    faculty VARCHAR(50),
    credits INT,
    capacity INT,
    PRIMARY KEY (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: specialisation
-- =====================================================
CREATE TABLE specialisation (
    specialisation_id INT NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    credits_required INT,
    PRIMARY KEY (specialisation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: specialisation_course (Junction Table)
-- =====================================================
CREATE TABLE specialisation_course (
    id INT NOT NULL,
    specialisation_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (specialisation_id) REFERENCES specialisation(specialisation_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Insert Dummy Data: users
-- =====================================================
INSERT INTO users (email, full_name, role, provider, provider_id) VALUES
('admin@academic.edu', 'John Administrator', 'admin', 'local', NULL),
('employee@academic.edu', 'Jane Employee', 'employee', 'local', NULL),
('student1@academic.edu', 'Alice Student', 'student', 'local', NULL),
('student2@academic.edu', 'Bob Student', 'student', 'local', NULL),
('faculty@academic.edu', 'Dr. Michael Professor', 'faculty', 'local', NULL),
('google.user@gmail.com', 'Sarah Google User', 'student', 'google', 'google_12345');

-- =====================================================
-- Insert Dummy Data: specialisation
-- =====================================================
INSERT INTO specialisation (specialisation_id, code, name, description, year, credits_required) VALUES
(1, 'TS', 'Theory & Systems', 'Focuses on theoretical foundations of computer science including algorithms, complexity theory, and system design', 2, 18),
(2, 'DS', 'Data Science', 'Specialization in data analysis, machine learning, and big data technologies', 2, 18),
(3, 'AI', 'Artificial Intelligence', 'Advanced study in AI, neural networks, and intelligent systems', 2, 20),
(4, 'SE', 'Software Engineering', 'Emphasis on software development methodologies, architecture, and best practices', 2, 18),
(5, 'CS', 'Cyber Security', 'Focus on information security, cryptography, and secure system design', 2, 20);

-- =====================================================
-- Insert Dummy Data: courses
-- =====================================================
INSERT INTO courses (course_id, course_code, name, description, year, term, faculty, credits, capacity) VALUES
-- Theory & Systems Courses
(101, 'CS501', 'Advanced Algorithms', 'Study of advanced algorithmic techniques and complexity analysis', 2, 'Fall', 'Computer Science', 4, 50),
(102, 'CS502', 'Operating Systems Design', 'In-depth study of operating system design and implementation', 2, 'Spring', 'Computer Science', 4, 45),
(103, 'CS503', 'Computer Architecture', 'Advanced computer architecture and system design', 2, 'Fall', 'Computer Science', 3, 40),
(104, 'CS504', 'Compiler Design', 'Theory and practice of compiler construction', 2, 'Spring', 'Computer Science', 4, 35),

-- Data Science Courses
(201, 'DS511', 'Machine Learning', 'Fundamentals of machine learning algorithms and applications', 2, 'Fall', 'Data Science', 4, 60),
(202, 'DS512', 'Big Data Analytics', 'Processing and analyzing large-scale datasets', 2, 'Spring', 'Data Science', 3, 50),
(203, 'DS513', 'Statistical Methods', 'Advanced statistical methods for data analysis', 2, 'Fall', 'Mathematics', 3, 45),
(204, 'DS514', 'Data Visualization', 'Techniques for effective data visualization and storytelling', 2, 'Spring', 'Data Science', 3, 40),
(205, 'DS515', 'Deep Learning', 'Neural networks and deep learning architectures', 2, 'Fall', 'Data Science', 4, 55),

-- Artificial Intelligence Courses
(301, 'AI521', 'Neural Networks', 'Architecture and training of neural networks', 2, 'Fall', 'AI Research', 4, 45),
(302, 'AI522', 'Natural Language Processing', 'Processing and understanding human language', 2, 'Spring', 'AI Research', 4, 40),
(303, 'AI523', 'Computer Vision', 'Image processing and computer vision techniques', 2, 'Fall', 'AI Research', 4, 42),
(304, 'AI524', 'Robotics', 'Autonomous systems and robotic control', 2, 'Spring', 'Engineering', 4, 30),

-- Software Engineering Courses
(401, 'SE531', 'Software Architecture', 'Design patterns and architectural styles', 2, 'Fall', 'Software Eng', 4, 50),
(402, 'SE532', 'Agile Development', 'Agile methodologies and DevOps practices', 2, 'Spring', 'Software Eng', 3, 45),
(403, 'SE533', 'Software Testing', 'Testing strategies and quality assurance', 2, 'Fall', 'Software Eng', 3, 40),
(404, 'SE534', 'Cloud Computing', 'Cloud platforms and distributed systems', 2, 'Spring', 'Software Eng', 4, 55),

-- Cyber Security Courses
(501, 'CY541', 'Cryptography', 'Mathematical foundations of cryptographic systems', 2, 'Fall', 'Security', 4, 40),
(502, 'CY542', 'Network Security', 'Securing computer networks and communications', 2, 'Spring', 'Security', 4, 45),
(503, 'CY543', 'Ethical Hacking', 'Penetration testing and security assessment', 2, 'Fall', 'Security', 3, 35),
(504, 'CY544', 'Digital Forensics', 'Investigation and analysis of digital evidence', 2, 'Spring', 'Security', 3, 30),

-- Common/Elective Courses
(601, 'GE551', 'Research Methodology', 'Methods and techniques for academic research', 2, 'Fall', 'General', 3, 100),
(602, 'GE552', 'Technical Writing', 'Professional and technical communication skills', 2, 'Spring', 'General', 2, 80);

-- =====================================================
-- Insert Dummy Data: specialisation_course
-- =====================================================
-- Theory & Systems - Courses
INSERT INTO specialisation_course (id, specialisation_id, course_id) VALUES
(1, 1, 101),   -- Advanced Algorithms
(2, 1, 102),   -- Operating Systems Design
(3, 1, 103),   -- Computer Architecture
(4, 1, 104),   -- Compiler Design
(5, 1, 601),   -- Research Methodology

-- Data Science - Courses
(6, 2, 201),   -- Machine Learning
(7, 2, 202),   -- Big Data Analytics
(8, 2, 203),   -- Statistical Methods
(9, 2, 204),   -- Data Visualization
(10, 2, 205),  -- Deep Learning
(11, 2, 601),  -- Research Methodology

-- Artificial Intelligence - Courses
(12, 3, 201),  -- Machine Learning
(13, 3, 205),  -- Deep Learning
(14, 3, 301),  -- Neural Networks
(15, 3, 302),  -- Natural Language Processing
(16, 3, 303),  -- Computer Vision
(17, 3, 304),  -- Robotics
(18, 3, 601),  -- Research Methodology

-- Software Engineering - Courses
(19, 4, 401),  -- Software Architecture
(20, 4, 402),  -- Agile Development
(21, 4, 403),  -- Software Testing
(22, 4, 404),  -- Cloud Computing
(23, 4, 601),  -- Research Methodology
(24, 4, 602),  -- Technical Writing

-- Cyber Security - Courses
(25, 5, 501),  -- Cryptography
(26, 5, 502),  -- Network Security
(27, 5, 503),  -- Ethical Hacking
(28, 5, 504),  -- Digital Forensics
(29, 5, 101),  -- Advanced Algorithms
(30, 5, 601);  -- Research Methodology

-- =====================================================
-- Verification Queries
-- =====================================================
-- Check table structure
SHOW TABLES;

-- Count records in each table
SELECT 'users' AS table_name, COUNT(*) AS record_count FROM users
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'specialisation', COUNT(*) FROM specialisation
UNION ALL
SELECT 'specialisation_course', COUNT(*) FROM specialisation_course;

-- Display sample data
SELECT '=== USERS ===' AS info;
SELECT id, email, full_name, role FROM users LIMIT 5;

SELECT '=== SPECIALISATIONS ===' AS info;
SELECT specialisation_id, code, name, credits_required FROM specialisation;

SELECT '=== COURSES (Sample) ===' AS info;
SELECT course_id, course_code, name, credits FROM courses LIMIT 10;

SELECT '=== SPECIALISATION-COURSE MAPPINGS (Sample) ===' AS info;
SELECT sc.id, s.name AS specialisation, c.name AS course
FROM specialisation_course sc
JOIN specialisation s ON sc.specialisation_id = s.specialisation_id
JOIN courses c ON sc.course_id = c.course_id
LIMIT 10;

-- =====================================================
-- Useful Queries for Testing
-- =====================================================
-- Get all courses for Data Science specialisation
-- SELECT c.* 
-- FROM courses c
-- JOIN specialisation_course sc ON c.course_id = sc.course_id
-- JOIN specialisation s ON sc.specialisation_id = s.specialisation_id
-- WHERE s.code = 'DS';

-- Count courses per specialisation
-- SELECT s.name, COUNT(sc.course_id) AS course_count
-- FROM specialisation s
-- LEFT JOIN specialisation_course sc ON s.specialisation_id = sc.specialisation_id
-- GROUP BY s.specialisation_id, s.name;
