from fastapi import HTTPException
from sqlalchemy.orm import Session

from typing import List
import models
from schemas import exam_schemas
from repositories import resources_repository


def get_exams(db: Session):
    return db.query(models.Exam).all()


def get_exam_by_id(db: Session, exam_id: int):
    return db.query(models.Exam).get(exam_id)


def create_exam(db: Session, exam: exam_schemas.ExamCreate):
    db_exam = models.Exam(**exam.dict())
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    return db_exam


def calculate_average(db: Session) -> float:
    exams: List[models.Exam] = db.query(models.Exam).all()
    sum_ects = 0.0
    sum_grade = 0.0

    for exam in exams:
        if exam.grade is None:
            continue
        sum_ects += float(exam.ects)
        sum_grade += float(exam.grade) * float(exam.ects)
    result = round(sum_grade*100 / sum_ects) / 100  # Round to two digits
    return result


def update_exam_by_id(db: Session, exam_id: int, exam: exam_schemas.ExamUpdate):
    db_exam = db.query(models.Exam).get(exam_id)
    db_exam.name = exam.name if exam.name else db_exam.name
    db_exam.date = exam.date if exam.date else db_exam.date
    db_exam.grade = exam.grade if exam.grade else db_exam.grade
    db_exam.ects = exam.ects if exam.ects else db_exam.ects
    db.commit()
    db.refresh(db_exam)
    return db_exam


async def delete_exam(db: Session, exam_id: int):
    exam: models.Exam = db.query(models.Exam).get(exam_id)
    if exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    await resources_repository.delete_resources_by_exam(db, exam_id)
    db.delete(exam)
    db.commit()
