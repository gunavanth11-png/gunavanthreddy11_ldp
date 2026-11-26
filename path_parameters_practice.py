
from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI()

students = [
    {
        "id": 1,
        "name": "Rahul",
        "age": 21,
        "course": "Python",
        "email": "rahul@gmail.com"
    },
    {
        "id": 2,
        "name": "Priya",
        "age": 22,
        "course": "Java",
        "email": "priya@gmail.com"
    },
    {
        "id": 3,
        "name": "Amit",
        "age": 23,
        "course": "FastAPI",
        "email": "amit@gmail.com"
    }
]


class StudentCreate(BaseModel):
    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=100)
    course: str
    email: str


class StudentUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=100)
    course: str
    email: str


class StudentPatch(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    age: Optional[int] = Field(None, ge=1, le=100)
    course: Optional[str] = None
    email: Optional[str] = None


@app.get("/")
def home():
    return {"message": "Student Management API"}



@app.get("/students")
def get_all_students():
    return students


#
@app.get("/students/{student_id}")
def get_student(student_id: int = Path(..., gt=0)):
    for student in students:
        if student["id"] == student_id:
            return student

    raise HTTPException(status_code=404, detail="Student not found")


# POST: Create a new student
@app.post("/students")
def create_student(student: StudentCreate):
    for existing in students:
        if existing["id"] == student.id:
            raise HTTPException(
                status_code=400,
                detail="Student ID already exists"
            )

    new_student = student.model_dump()
    students.append(new_student)

    return {
        "message": "Student created successfully",
        "student": new_student
    }


@app.put("/students/{student_id}")
def replace_student(
        student_id: int = Path(..., gt=0),
        student: StudentUpdate = None
):
    for existing in students:
        if existing["id"] == student_id:
            updated_data = student.model_dump()
            existing.update(updated_data)

            return {
                "message": "Student details replaced successfully",
                "student": existing
            }

    raise HTTPException(status_code=404, detail="Student not found")



@app.patch("/students/{student_id}")
def partial_update_student(
        student_id: int,
        student: StudentPatch
):
    for existing in students:
        if existing["id"] == student_id:
            updated_data = student.model_dump(exclude_unset=True)
            existing.update(updated_data)

            return {
                "message": "Student details updated successfully",
                "student": existing
            }

    raise HTTPException(status_code=404, detail="Student not found")

@app.delete("/students/{student_id}")
def delete_student(student_id: int = Path(..., gt=0)):
    for student in students:
        if student["id"] == student_id:
            students.remove(student)

            return {
                "message": "Student deleted successfully",
                "student_id": student_id
            }

    raise HTTPException(status_code=404, detail="Student not found")
