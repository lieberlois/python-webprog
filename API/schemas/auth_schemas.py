from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class BaseUser(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str


class UserRegister(BaseUser):
    password: str


class UserInDB(BaseUser):
    password: str


class User(BaseUser):
    id: int

    class Config:
        orm_mode = True

