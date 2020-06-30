"""
schemas.py uses pydantic for data validation, conversion, and documentation classes and instances
"""

from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ExamBase(BaseModel):
    name: str
    date: Optional[datetime] = None
    grade: Optional[float] = None


class ExamCreate(ExamBase):
    pass


class ExamUpdate(ExamBase):
    pass


class Exam(ExamBase):
    id: int

    class Config:
        orm_mode: True
