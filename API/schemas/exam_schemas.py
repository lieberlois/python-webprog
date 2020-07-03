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
    date: Optional[DateType] = None
    grade: Optional[float] = None


class ExamCreate(ExamBase):
    pass


class ExamAverage(BaseModel):
    average: float


class ExamUpdate(ExamBase):
    name: Optional[str]  # Name should be optional when changing an exam
    ects: Optional[int]  # Name should be optional when changing an exam


class Exam(ExamBase):
    id: int
    resources: List[resource_schemas.Resource] = []

    class Config:
        orm_mode: True
        # arbitrary_types_allowed = True
        # extra = Extra.allow
