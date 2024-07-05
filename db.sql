-- Create table for departments
CREATE TABLE departments (
    dept_code VARCHAR2(10) PRIMARY KEY,
    dept_name VARCHAR2(100) NOT NULL
);

-- Create table for students
CREATE TABLE students (
    roll VARCHAR2(20) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    address VARCHAR2(200) NOT NULL,
    phone VARCHAR2(20) NOT NULL,
    dept_code VARCHAR2(10) REFERENCES departments(dept_code)
);
