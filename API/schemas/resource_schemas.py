from pydantic import BaseModel, Extra


class ResourceBase(BaseModel):
    exam_id: int
    title: str
    filetype: str


class ResourceCreate(BaseModel):
    pass


class Resource(ResourceBase):
    id: str

    class Config:
        orm_mode: True

