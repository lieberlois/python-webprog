"""
exam_schemas.py uses pydantic for data validation, conversion, and documentation classes and instances
"""

# TODO: Extra documentation for schemas https://fastapi.tiangolo.com/tutorial/schema-extra-example/

from datetime import date as DateType
from typing import Optional, List

from pydantic import BaseModel, Field

from schemas import resource_schemas


class ExamBase(BaseModel):
    name: str = Field(..., example="Programming")
    ects: int = Field(..., ge=1, example=5)
    attempt: int = Field(1, ge=1, example=1, description="Current attempt (min.: 1)")  # ge = greater/equal
    passed: Optional[bool] = False
    date: Optional[DateType] = None  # Todo: Date Format (Probably want a timestamp aswell!)
    grade: Optional[float] = Field(None, ge=1, le=5, example=2.3, description="Grade for exam between 1.0 and 5.0")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class ExamCreate(ExamBase):
    pass


class ExamAverage(BaseModel):
    average: float


class ExamUpdate(ExamBase):
    name: Optional[str]  # Name should be optional when changing an exam
    ects: Optional[int]  # ECTS should be optional when changing an exam
    attempt: Optional[int]  # Attempt should be optional when changing an exam


class Exam(ExamBase):
    id: int
    user_id: int
    resources: List[resource_schemas.Resource] = []

    class Config:
        orm_mode: True

