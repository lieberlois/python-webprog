"""
https://testdriven.io/blog/fastapi-crud/

This link describes deployment, testing and splitting up the API in multiple files (per router, similar to Node.JS)
"""

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import repository
import schemas
from database import SessionLocal, engine

app = FastAPI()
models.Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# TODO: Every route can have a response_model like schemas.Exam (example: response_model=List[schemas.Exam])
#       For some reason, i couldn't get this to work, because of this error:
# pydantic.error_wrappers.ValidationError: 1 validation error for Exam
# response
#   value is not a valid dict (type=type_error.dict)


@app.get("/exams")
async def get_exams(db: Session = Depends(get_db)):
    return repository.get_exams(db)


@app.get("/exams/{exam_id}")
async def get_exam(exam_id: int, db: Session = Depends(get_db)):
    db_exam = repository.get_exam_by_id(db, exam_id=exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    return db_exam


@app.post("/exams")
async def create_exam(exam: schemas.ExamCreate, db: Session = Depends(get_db)):
    return repository.create_exam(db, exam)


# TODO: Put and Delete should return 204 codes (No Content), but trying that produced the following error:
# h11._util.LocalProtocolError: Too much data for declared Content-Length

@app.put("/exams/{exam_id}", status_code=200)
async def update_exam(exam_id: int, exam: schemas.ExamUpdate, db: Session = Depends(get_db)):
    db_exam = repository.get_exam_by_id(db, exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    repository.update_exam_by_id(db, exam_id, exam)


@app.delete("/exams/{exam_id}", status_code=200)
async def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    db_exam = repository.get_exam_by_id(db, exam_id)
    if db_exam is None:
        raise HTTPException(status_code=404, detail="Exam not found")
    return repository.delete_exam(db, db_exam)