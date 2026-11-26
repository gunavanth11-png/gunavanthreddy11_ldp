
from fastapi import FastAPI
from models import Student

app = FastAPI(
    title="Student Management API",
    description="A beginner-friendly FastAPI practice project",
    version="1.0.0"
)

students = []

@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management API"
    }

@app.get("/students")
def get_students():
    return {
        "students": students
    }

@app.post("/students")
def create_student(student: Student):
    students.append(student.model_dump())

    return {
        "message": "Student added successfully",
        "student": student
    }

@app.get("/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        if student["id"] == student_id:
            return student

    return {
        "message": "Student not found"
    }

@app.delete("/students/{student_id}")
def delete_student(student_id: int):

    for student in students:

        if student["id"] == student_id:

            students.remove(student)

            return {
                "message": "Student deleted successfully",
                "student_id": student_id
            }

    return {
        "message": "Student not found"
    }