from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from auth import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, \
    get_current_active_user, create_user
from database import get_db
from schemas.auth_schemas import Token, User, UserRegister

router = APIRouter()


@router.post("/token", response_model=Token)
async def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register")
async def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    return create_user(db, user_data)


@router.get("/users/me/", response_model=User)
async def read_users_me(db: Session = Depends(get_db)):
    current_user: User = await get_current_active_user(db)
    return current_user

