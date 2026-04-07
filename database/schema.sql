-- Users (students + admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    role VARCHAR(10) CHECK (role IN ('student', 'admin'))
);

-- Courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    instructor VARCHAR(100)
);

-- Feedback Questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT
);

-- Feedback Responses
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id),
    course_id INT REFERENCES courses(id),
    question_id INT REFERENCES questions(id),
    rating INT,
    comment TEXT
);