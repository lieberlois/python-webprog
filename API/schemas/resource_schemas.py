from pydantic import BaseModel, Field


class ResourceBase(BaseModel):
    exam_id: int = Field(..., example=1)
    title: str = Field(..., example="Sample Title")
    filetype: str = Field(..., example="jpg")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class ResourceCreate(BaseModel):
    pass


class Resource(ResourceBase):
    id: str

    class Config:
        orm_mode: True

