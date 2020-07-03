from typing import List

from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import resource_schemas
from repositories import resources_repository
from database import SessionLocal

router = APIRouter()


# Todo: This should be moved into main.py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model_exclude_none=List[resource_schemas.Resource])
async def get_exams(db: Session = Depends(get_db)):
    return resources_repository.get_resources(db)


@router.post("/{exam_id}", response_model_exclude_none=resource_schemas.Resource)
async def create_resource(exam_id: int,
                          title: str = Form(...),
                          file: UploadFile = File(...),
                          db: Session = Depends(get_db)):
    resource = await resources_repository.create_resource(db, file=file, title=title, exam_id=exam_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Exam not found")

    return resource
