"""
models.py contains the table information for the database.

# https://fastapi.tiangolo.com/tutorial/sql-databases/ for Documentation
"""
from sqlalchemy import Numeric, Column, Integer, String, DateTime, CheckConstraint, ForeignKey, Boolean
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
        CheckConstraint("attempt > 0"),
        nullable=False,
    )
    date = Column("date", DateTime, nullable=True)
    passed = Column("passed", Boolean, nullable=False, default=False)
    grade = Column(
        "grade",
        Numeric(1, 1, asdecimal=True),
        # Exams, that only count as passed will have their grade set to None / Null
        CheckConstraint("grade >= 1.0 AND grade <= 5.0"),
        nullable=True
    )
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    resources = relationship("Resource", backref="exams", lazy=False)


def generate_uuid():
    return uuid.uuid4().hex


class Resource(Base):
    __tablename__ = "resources"

    id = Column("id", String, primary_key=True, default=generate_uuid)
    title = Column("title", String, nullable=False)
    filetype = Column("filetype", String, nullable=False)
    filename = Column("filename", String, nullable=False)
    shared = Column("shared", Boolean, nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)


class User(Base):
    __tablename__ = "users"

    id = Column("id", Integer, primary_key=True, index=True)
    username = Column("username", String, unique=True, nullable=False)
    password = Column("password", String, nullable=False)
    first_name = Column("first_name", String, nullable=False)
    last_name = Column("last_name", String, nullable=False)
    email = Column("email", String, nullable=False)
    exams = relationship("Exam", backref="users", lazy=False)
