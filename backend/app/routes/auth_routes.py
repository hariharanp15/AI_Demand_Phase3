from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =====================================================
# DATABASE
# =====================================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================================
# REQUEST MODELS
# =====================================================

class RegisterRequest(BaseModel):

    name: str
    email: str
    password: str


class LoginRequest(BaseModel):

    email: str
    password: str


# =====================================================
# REGISTER API
# =====================================================

@router.post("/register")
def register_user(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        role="Viewer"
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


# =====================================================
# LOGIN API
# =====================================================

@router.post("/login")
def login_user(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    # ADMIN LOGIN
    if (
        user.email == "admin@gmail.com"
        and
        user.password == "Admin@123"
    ):

        return {
            "access_token": "admin_token",
            "token_type": "bearer",
            "user": {
                "name": "Admin",
                "email": "admin@gmail.com",
                "role": "Super Admin"
            }
        }

    # DATABASE USER LOGIN
    existing_user = db.query(User).filter(
        User.email == user.email,
        User.password == user.password
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return {
        "access_token": "user_token",
        "token_type": "bearer",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role
        }
    }