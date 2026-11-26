
from pydantic import BaseModel, Field
from typing import Optional


class Student(BaseModel):
    id: int = Field(..., gt=0, description="Student ID")
    name: str = Field(..., min_length=2, max_length=50)
    age: int = Field(..., ge=1, le=100)
    course: str = Field(..., min_length=2)
    email: str
    phone: Optional[str] = None
