from sqlalchemy.orm import Session
from fastapi import UploadFile
import models
import os
import uuid

UPLOADS_PATH = os.path.join(os.path.dirname(__file__), "..", "uploads")


async def get_resources(db: Session):
    return db.query(models.Resource).all()


async def get_resource_path_by_id(db: Session, resource_id: str) -> str:
    file_info: models.Resource = db.query(models.Resource).get(resource_id)
    path = os.path.join(UPLOADS_PATH, file_info.filename)
    return path


async def create_resource(db: Session, file: UploadFile, title: str, exam_id: int):
    exam = db.query(models.Exam).get(exam_id)
    if exam is None:
        return None

    filename, filetype = await _store_file(file)

    f_info = dict()
    f_info["filename"] = filename
    f_info["exam_id"] = exam_id
    f_info["title"] = title
    f_info["filetype"] = filetype

    db_resource = models.Resource(**f_info)
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource


async def delete_resource_path_by_id(db: Session, resource_id: str):
    file_info: models.Resource = db.query(models.Resource).get(resource_id)
    path = os.path.join(UPLOADS_PATH, file_info.filename)

    _delete_file(path)
    db.delete(file_info)


async def _store_file(file):
    ftype = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ftype}"
    data = await file.read()
    with open(os.path.join(UPLOADS_PATH, filename), "wb") as f:
        f.write(data)
    return filename, ftype


def _delete_file(path):
    os.remove(path)

# TODO: When deleting a resource, the file has to be deleted aswell. Also: What happens when we delete an exam?