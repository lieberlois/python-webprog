from sqlalchemy.orm import Session

import models
import schemas


def get_exams(db: Session):
    return db.query(models.Exam).all()


def get_exam_by_id(db: Session, exam_id: int):
    return db.query(models.Exam).get(exam_id)


def create_exam(db: Session, exam: schemas.ExamCreate):
    db_exam = models.Exam(**exam.dict())
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    return db_exam


def update_exam_by_id(db: Session, exam_id: int, exam: schemas.ExamUpdate):
    db_exam = db.query(models.Exam).get(exam_id)
    db_exam.name = exam.name if exam.name else db_exam.name
    db_exam.date = exam.date if exam.date else db_exam.date
    db_exam.grade = exam.grade if exam.grade else db_exam.grade
    db.commit()
    db.refresh(db_exam)
    return db_exam


def delete_exam(db: Session, exam: models.Exam):
    db.delete(exam)
    db.commit()
