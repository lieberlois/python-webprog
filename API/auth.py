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
from models import User

from schemas.auth_schemas import TokenData, User, UserRegister

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


async def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user_from_db(db: Session, username: str):
    # Todo: Possibly move this into its own repository?
    return db.query(User).filter(User.username == username).first()


async def create_user_in_db(db: Session, user_info: UserRegister):
    user_dict = user_info.dict()
    plain_pw = user_dict["password"]

    user_dict["password"] = await get_password_hash(plain_pw)

    db_user = models.User(**user_dict)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def authenticate_user(db: Session, username: str, password: str):
    user = await get_user_from_db(db, username)
    if not user:
        return False
    if not await verify_password(password, user.hashed_password):
        return False
    return user


async def get_current_user_from_token(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
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
    user = get_user_from_db(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_user(current_user: User = Depends(get_current_user_from_token)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return current_user


async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# TODO: https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ fix the bug
