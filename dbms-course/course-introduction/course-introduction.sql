CREATE DATABASE IF NOT EXISTS dbms_practice;
USE dbms_practice;
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    marks INT
);
INSERT INTO students
VALUES
(1, 'Rahul', 'CSE', 85),
(2, 'Anjali', 'ECE', 91),
(3, 'Kiran', 'CSE', 76),
(4, 'Priya', 'IT', 88),
(5, 'Arjun', 'CSE', 67);
SELECT * FROM students;
SELECT student_name, marks
FROM students
WHERE marks > 80;
SELECT *
FROM students
ORDER BY marks DESC;
SELECT department, AVG(marks) AS average_marks
FROM students
GROUP BY department;
UPDATE students
SET marks = 90
WHERE student_id = 3;
ALTER TABLE students
ADD email VARCHAR(100);
ALTER TABLE students
ADD email VARCHAR(100);
DESCRIBE students;