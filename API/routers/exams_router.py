from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from pydantic import Required
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette.status import HTTP_204_NO_CONTENT

from auth import get_current_user
from exceptions import NotFound
from repositories import exams_repository
from schemas import exam_schemas
from database import get_db
from schemas.auth_schemas import User

router = APIRouter()


@router.get("/", response_model_exclude_none=List[exam_schemas.Exam])
def get_exams(only_passed: bool = False, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = exams_repository.get_exams(db, current_user.id, only_passed=only_passed)
    if result is None:
        raise HTTPException(status_code=404, detail="No exams found")
    return result


@router.get("/average", response_model=exam_schemas.ExamAverage)
def calculate_average_grade(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    average, total_ects = exams_repository.calculate_average(db, current_user.id)
    return { "average": average, "total_ects": total_ects }


@router.get("/{exam_id}", response_model_exclude_none=exam_schemas.Exam)
async def get_exam(exam_id: int = Path(Required), db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    db_exam = exams_repository.get_exam_by_id(db, exam_id=exam_id, user_id=current_user.id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    print(db_exam.resources)
    return db_exam


@router.post("/", response_model_exclude_none=exam_schemas.Exam, status_code=201)
async def create_exam(exam: exam_schemas.ExamCreate, db: Session = Depends(get_db),
                      current_user: User = Depends(get_current_user)):
    try:
        result = exams_repository.create_exam(db, exam, user_id=current_user.id)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid request")
    except NotFound:
        raise HTTPException(status_code=404, detail="User not found")
    return result


@router.put("/{exam_id}", response_model_exclude_none=exam_schemas.Exam, status_code=200)
async def update_exam(exam_id: int, exam: exam_schemas.ExamUpdate, db: Session = Depends(get_db),
                      current_user: User = Depends(get_current_user)):
    db_exam = exams_repository.get_exam_by_id(db, exam_id, current_user.user_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    try:
        result = exams_repository.update_exam_by_id(db, exam_id, exam, user_id=current_user.id)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Invalid request")
    return result


@router.delete("/{exam_id}", status_code=204)
async def delete_exam(exam_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    await exams_repository.delete_exam(db, exam_id, user_id=current_user.id)
    return Response(status_code=HTTP_204_NO_CONTENT)
