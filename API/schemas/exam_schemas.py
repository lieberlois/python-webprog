"""
exam_schemas.py uses pydantic for data validation, conversion, and documentation classes and instances
"""

# TODO: Extra documentation for schemas https://fastapi.tiangolo.com/tutorial/schema-extra-example/

from typing import Optional, List
from datetime import date as DateType
from pydantic import BaseModel, Extra
from schemas import resource_schemas


class ExamBase(BaseModel):
    name: str
    ects: int
    attempt: int = 1
    user_id: int
    passed: Optional[bool] = False
    date: Optional[DateType] = None  # Todo: Date Format (Probably want a timestamp aswell!)
    grade: Optional[float] = None


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
    resources: List[resource_schemas.Resource] = []

    class Config:
        orm_mode: True

