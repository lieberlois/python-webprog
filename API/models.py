"""
models.py contains the table information for the database.

# https://fastapi.tiangolo.com/tutorial/sql-databases/ for Documentation
# Possibly add Alembic for Migrations
"""
from sqlalchemy import Numeric, Column, Integer, String, DateTime, CheckConstraint
from database import Base


class Exam(Base):
    __tablename__ = "exams"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name", String, unique=False, nullable=False)
    date = Column("date", DateTime, nullable=True)
    grade = Column(
        "grade",
        Numeric(1, 1, asdecimal=True),
        CheckConstraint("grade >= 1.0 AND grade <= 5.0"),
        nullable=True
    )

