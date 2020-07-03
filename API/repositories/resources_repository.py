from sqlalchemy.orm import Session
from fastapi import UploadFile
import models
import os
import uuid

UPLOADS_PATH = os.path.join(os.path.dirname(__file__), "..", "uploads")


def get_resources(db: Session):
    return db.query(models.Resource).all()


def get_resource_by_id(db: Session, resource_id: int):
    return db.query(models.Resource).get(resource_id)


async def create_resource(db: Session, file: UploadFile, title: str, exam_id: int):
    exam = db.query(models.Exam).get(exam_id)
    if exam is None:
        return None

    ftype = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ftype}"
    data = await file.read()
    with open(os.path.join(UPLOADS_PATH, filename), "wb") as f:
        f.write(data)

    f_info = dict()
    f_info["filename"] = filename
    f_info["exam_id"] = exam_id
    f_info["title"] = title

    db_resource = models.Resource(**f_info)
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

