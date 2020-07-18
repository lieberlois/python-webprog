from datetime import timedelta, datetime
from typing import Optional

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from starlette import status

import models
from database import get_db
from schemas.auth_schemas import TokenData, User, UserInDB, UserRegister


# TODO: Maybe turn authentication into a middleware?
#
# https://fastapi-contrib.readthedocs.io/en/latest/fastapi_contrib.auth.html
# https://fastapi.tiangolo.com/tutorial/middleware/
# https://fastapi.tiangolo.com/advanced/middleware/
# https://www.starlette.io/authentication/


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user(db: Session, username: str) -> UserInDB:
    db_user: UserInDB = db.query(models.User).filter(models.User.username == username).first()
    if db_user is not None:
        return db_user


async def create_user(db: Session, user_info: UserRegister):
    user_dict = user_info.dict()
    user_dict["password"] = get_password_hash(user_dict["password"])

    db_user = models.User(**user_dict)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def authenticate_user(db: Session, username: str, password: str) -> UserInDB:
    user = await get_user(db, username)
    if not user:
        raise Exception("user not found")
    if not verify_password(password, user.password):
        raise Exception("wrong password")
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_user_from_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except PyJWTError:
        raise credentials_exception
    user = await get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_user(current_user: User = Depends(get_user_from_token)):
    if current_user is None:
        raise HTTPException(status_code=400, detail="Invalid user")
    return current_user
