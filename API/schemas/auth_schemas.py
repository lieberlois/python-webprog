from typing import Optional

from pydantic import BaseModel, validator, Field
import re


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class BaseUser(BaseModel):
    username: str = Field(..., example="SampleUser123")
    email: str = Field(..., example="sample@gmail.com")
    first_name: str = Field(..., example="Sample")
    last_name: str = Field(..., example="User")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class UserRegister(BaseUser):
    password: str

    @validator("password")
    def password_must_fulfill_rules(cls, v: str):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters long")
        if not any(char.isdigit() for char in v):
            raise ValueError("Password must contain at least one number")
        return v

    @validator("email")
    def email_must_be_valid_format(cls, v: str):
        regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        if re.match(regex, v) is None:
            raise ValueError("Invalid Email")
        return v


class UserInDB(BaseUser):
    password: str


class User(BaseUser):
    id: int

    class Config:
        orm_mode = True
