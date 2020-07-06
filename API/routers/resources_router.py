from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from schemas import resource_schemas
from repositories import resources_repository
from database import get_db
from starlette.responses import Response
from starlette.status import HTTP_204_NO_CONTENT

from schemas.auth_schemas import User

router = APIRouter()


@router.get("/{resource_id}")
async def download_resource(resource_id: str, db: Session = Depends(get_db),
                            current_user: User = Depends(get_current_user)):
    check_user_id(db, resource_id, current_user.id)
    path = await resources_repository.get_resource_path_by_id(db, resource_id)
    return FileResponse(path)


@router.post("/{exam_id}", response_model_exclude_none=resource_schemas.Resource)
async def create_resource(exam_id: int,
                          title: str = Form(...),
                          file: UploadFile = File(...),
                          db: Session = Depends(get_db),
                          current_user: User = Depends(get_current_user)):

    referenced_exam: models.Exam = db.query(models.Exam).get(exam_id)
    if referenced_exam.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    resource = await resources_repository.create_resource(db, file=file, title=title, exam_id=exam_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Exam not found")

    return resource


@router.delete("/{resource_id}", status_code=204)
async def delete_resource(resource_id: str, db: Session = Depends(get_db),
                          current_user: User = Depends(get_current_user)):
    check_user_id(db, resource_id, current_user.id)
    await resources_repository.delete_resource_path_by_id(db, resource_id)
    return Response(status_code=HTTP_204_NO_CONTENT)


def check_user_id(db: Session, resource_id, user_id):
    resource: models.Resource = db.query(models.Resource).get(resource_id)
    if resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")

    referenced_exam: models.Exam = db.query(models.Exam).get(resource.exam_id)

    print(f"{referenced_exam.user_id} - {user_id}")
    if referenced_exam.user_id != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
