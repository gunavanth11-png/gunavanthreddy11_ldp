
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()


class Student(BaseModel):
    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=100)
    course: str = Field(..., min_length=2)
    email: str


@app.get("/")
def home():
    return {"message": "Schema Practice API"}


@app.post("/students")
def create_student(student: Student):
    return {
        "message": "Student created successfully",
        "student_details": student
    }


@app.put("/students")
def update_student(student: Student):
    return {
        "message": "Student updated successfully",
        "student_details": student
    }
