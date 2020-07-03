"""
models.py contains the table information for the database.

# https://fastapi.tiangolo.com/tutorial/sql-databases/ for Documentation
# TODO: Possibly add Alembic for Migrations
"""
from sqlalchemy import Numeric, Column, Integer, String, DateTime, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Exam(Base):
    __tablename__ = "exams"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name", String, nullable=False)
    date = Column("date", DateTime, nullable=True)
    grade = Column(
        "grade",
        Numeric(1, 1, asdecimal=True),
        CheckConstraint("grade >= 1.0 AND grade <= 5.0"),
        nullable=True
    )
    resources = relationship("Resource", back_populates="exam")


class Resource(Base):
    __tablename__ = "resources"

    id = Column("id", Integer, primary_key=True, index=True)
    title = Column("title", String, nullable=False)
    filename = Column("filename", String, nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)

    exam = relationship("Exam", back_populates="resources")
