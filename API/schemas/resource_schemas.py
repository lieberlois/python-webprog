from pydantic import BaseModel, Extra


class ResourceBase(BaseModel):
    title: str
    exam_id: int


class ResourceCreate(BaseModel):
    pass


class Resource(ResourceBase):
    id: int

    class Config:
        orm_mode: True
        arbitrary_types_allowed = True
        extra = Extra.allow
