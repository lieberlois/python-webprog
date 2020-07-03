from typing import List

from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from schemas import resource_schemas
from repositories import resources_repository
from database import SessionLocal
from starlette.responses import Response
from starlette.status import HTTP_204_NO_CONTENT

router = APIRouter()


# Todo: This should be moved into main.py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# TODO: This route only exists for testing, remove this!
@router.get("/", response_model_exclude_none=List[resource_schemas.Resource])
async def get_resources(db: Session = Depends(get_db)):
    return resources_repository.get_resources(db)


@router.get("/{resource_id}")
async def download_resource(resource_id: str, db: Session = Depends(get_db)):
    path = await resources_repository.get_resource_path_by_id(db, resource_id)
    return FileResponse(path)


@router.post("/{exam_id}", response_model_exclude_none=resource_schemas.Resource)
async def create_resource(exam_id: int,
                          title: str = Form(...),
                          file: UploadFile = File(...),
                          db: Session = Depends(get_db)):
    resource = await resources_repository.create_resource(db, file=file, title=title, exam_id=exam_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Exam not found")

    return resource


@router.delete("/{resource_id}", status_code=204)
async def download_resource(resource_id: str, db: Session = Depends(get_db)):
    await resources_repository.delete_resource_path_by_id(db, resource_id)
    return Response(status_code=HTTP_204_NO_CONTENT)
