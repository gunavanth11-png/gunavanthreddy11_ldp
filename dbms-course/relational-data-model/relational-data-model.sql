USE dbms_practice;
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);
INSERT INTO departments
VALUES
(101, 'CSE'),
(102, 'ECE'),
(103, 'IT');
ALTER TABLE students
ADD department_id INT;
ALTER TABLE students
ADD FOREIGN KEY (department_id)
REFERENCES departments(department_id);
UPDATE students
SET department_id = 101
WHERE student_id IN (1, 3, 5);

UPDATE students
SET department_id = 102
WHERE student_id = 2;

UPDATE students
SET department_id = 103
WHERE student_id = 4;
SELECT
    d.department_name,
    COUNT(s.student_id) AS student_count
FROM departments d
LEFT JOIN students s
ON d.department_id = s.department_id
GROUP BY d.department_name
HAVING COUNT(s.student_id) >= 1;
SELECT *
FROM students
ORDER BY marks DESC;

