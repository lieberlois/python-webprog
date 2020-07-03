"""
https://testdriven.io/blog/fastapi-crud/

This link describes deployment, testing and splitting up the API in multiple files (per router, similar to Node.JS)
"""
import uvicorn
from fastapi import FastAPI
from routers import exams_router

import models
from database import engine

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.include_router(
    exams_router.router,
    prefix="/exams",
    tags=["Exams"]
)

if __name__ == '__main__':
    # Use this for debugging purposes only, otherwise start with "uvicorn main:app --reload"
    uvicorn.run(app, host="0.0.0.0", port=8000)
