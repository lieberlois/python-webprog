from typing import Optional

from pydantic import BaseModel, Field


class ResourceBase(BaseModel):
    exam_id: int = Field(..., example=1)
    title: str = Field(..., example="Sample Title")
    filetype: str = Field(..., example="jpg")
    shared: Optional[bool] = Field(
        False,
        example=False,
        description="Whether the resource should be accessible by other users"
    )

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class ResourceUpdate(BaseModel):
    title: Optional[str] = Field(None, example="New Title", description="New title for resource")
    shared: Optional[bool] = Field(None, example=True, description="New shared state")


class Resource(ResourceBase):
    id: str

    class Config:
        orm_mode: True

