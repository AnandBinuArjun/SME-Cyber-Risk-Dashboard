from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = UserRole.VIEWER
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    email: EmailStr
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True
