from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from pydantic import Required
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette.status import HTTP_204_NO_CONTENT

from repositories import exams_repository
from schemas import exam_schemas
from database import SessionLocal

router = APIRouter()


# Todo: This should be moved into main.py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model_exclude_none=List[exam_schemas.Exam])
async def get_exams(db: Session = Depends(get_db)):
    return exams_repository.get_exams(db)


@router.get("/{exam_id}", response_model_exclude_none=exam_schemas.Exam)
async def get_exam(exam_id: int = Path(Required), db: Session = Depends(get_db)):
    db_exam = exams_repository.get_exam_by_id(db, exam_id=exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    return db_exam


@router.post("/", response_model_exclude_none=exam_schemas.Exam, status_code=201)
async def create_exam(exam: exam_schemas.ExamCreate, db: Session = Depends(get_db)):
    try:
        result = exams_repository.create_exam(db, exam)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid request")
    return result


@router.put("/{exam_id}", response_model_exclude_none=exam_schemas.Exam, status_code=200)
async def update_exam(exam_id: int, exam: exam_schemas.ExamUpdate, db: Session = Depends(get_db)):
    db_exam = exams_repository.get_exam_by_id(db, exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    try:
        result = exams_repository.update_exam_by_id(db, exam_id, exam)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid request")
    return result


@router.delete("/{exam_id}", status_code=204)
async def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    db_exam = exams_repository.get_exam_by_id(db, exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    exams_repository.delete_exam(db, db_exam)
    return Response(status_code=HTTP_204_NO_CONTENT)
