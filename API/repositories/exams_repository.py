from fastapi import HTTPException
from sqlalchemy.orm import Session

from typing import List
import models
from exceptions import NotFound
from schemas import exam_schemas
from repositories import resources_repository


def get_exams(db: Session, user_id: int, only_passed: bool = False):
    if only_passed is True:
        return db.query(models.Exam).filter(models.Exam.user_id == user_id).filter(models.Exam.passed == True).all()
    else:
        return db.query(models.Exam).filter(models.Exam.user_id == user_id).all()


def get_exam_by_id(db: Session, exam_id: int, user_id: int):
    return db.query(models.Exam).filter_by(id=exam_id, user_id=user_id).first()


def create_exam(db: Session, exam: exam_schemas.ExamCreate, user_id: int):
    user = db.query(models.User).get(user_id)
    if user is None:
        raise NotFound("User not found")
    exam_dict = exam.dict()
    exam_dict["user_id"] = user_id
    db_exam = models.Exam(**exam_dict)
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    return db_exam


def calculate_average(db: Session, user_id: int) -> (float, int):
    exams: List[models.Exam] = db.query(models.Exam).filter(models.Exam.user_id == user_id).all()
    sum_ects = 0.0
    sum_grade = 0.0

    for exam in exams:
        if exam.passed is False or exam.grade is None:
            continue
        sum_ects += float(exam.ects)
        sum_grade += float(exam.grade) * float(exam.ects)
    result = round(sum_grade * 100 / sum_ects) / 100  # Round to two digits
    return result, sum_ects


def update_exam_by_id(db: Session, exam_id: int, exam: exam_schemas.ExamUpdate, user_id: int):
    db_exam: models.Exam = get_exam_by_id(db, exam_id, user_id)
    if db_exam is None:
        raise NotFound("Exam not found")
    db_exam.name = exam.name if exam.name else db_exam.name
    db_exam.date = exam.date if exam.date else db_exam.date
    db_exam.grade = exam.grade if exam.grade else db_exam.grade
    db_exam.ects = exam.ects if exam.ects else db_exam.ects
    db_exam.attempt = exam.attempt if exam.attempt else db_exam.attempt
    db_exam.passed = exam.passed if exam.passed  else db_exam.passed
    db.commit()
    db.refresh(db_exam)
    return db_exam


async def delete_exam(db: Session, exam_id: int, user_id: int):
    exam: models.Exam = get_exam_by_id(db, exam_id, user_id)
    if exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    await resources_repository.delete_resources_by_exam(db, exam_id)
    db.delete(exam)
    db.commit()
