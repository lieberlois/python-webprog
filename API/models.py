"""
models.py contains the table information for the database.

# https://fastapi.tiangolo.com/tutorial/sql-databases/ for Documentation
# TODO: Possibly add Alembic for Migrations
# TODO: User Management https://fastapi.tiangolo.com/tutorial/security/first-steps/
"""
from sqlalchemy import Numeric, Column, Integer, String, DateTime, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship

from database import Base
import uuid


class Exam(Base):
    __tablename__ = "exams"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name", String, nullable=False)
    ects = Column(
        "ects",
        Integer,
        CheckConstraint("ects > 0"),
        nullable=False
    )
    attempt = Column(
        "attempt",
        Integer,
        CheckConstraint("attempt > 0"),  # TODO: University Students have an unlimited amount of attemps
        nullable=False,
    )
    date = Column("date", DateTime, nullable=True)
    grade = Column(
        "grade",
        Numeric(1, 1, asdecimal=True),
        # Exams, that only count as passed should have a grade of 0
        CheckConstraint("grade >= 1.0 AND grade <= 5.0 or grade = 0"),
        nullable=True
    )
    resources = relationship("Resource", backref="exams", lazy=False)


def generate_uuid():
    return uuid.uuid4().hex


class Resource(Base):
    __tablename__ = "resources"

    id = Column("id", String, primary_key=True, default=generate_uuid)
    title = Column("title", String, nullable=False)
    filetype = Column("filetype", String, nullable=False)
    filename = Column("filename", String, nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"))
