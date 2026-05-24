from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# =====================================================
# DATABASE SESSION
# =====================================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================================
# REQUEST MODEL
# =====================================================

class UpdateUserRequest(BaseModel):

    name: str | None = None
    email: str | None = None
    role: str | None = None


# =====================================================
# GET ALL USERS
# =====================================================

@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    result = []

    for user in users:

        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        })

    return result


# =====================================================
# GET SINGLE USER
# =====================================================

@router.get("/users/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


# =====================================================
# UPDATE USER
# =====================================================

@router.put("/users/{user_id}")
def update_user(
    user_id: int,
    updated_data: UpdateUserRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if updated_data.name is not None:

        user.name = updated_data.name

    if updated_data.email is not None:

        user.email = updated_data.email

    if updated_data.role is not None:

        allowed_roles = [
            "Super Admin",
            "Analyst",
            "Viewer"
        ]

        if updated_data.role not in allowed_roles:

            raise HTTPException(
                status_code=400,
                detail="Invalid role"
            )

        user.role = updated_data.role

    db.commit()
    db.refresh(user)

    return {
        "message": "User updated successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }


# =====================================================
# DELETE USER
# =====================================================

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {
        "message": "User deleted successfully"
    }


# =====================================================
# CHANGE ROLE
# =====================================================

class RoleRequest(BaseModel):
    role: str


@router.put("/users/{user_id}/role")
def change_user_role(
    user_id: int,
    payload: RoleRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    allowed_roles = [
        "Super Admin",
        "Analyst",
        "Viewer"
    ]

    if payload.role not in allowed_roles:

        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    user.role = payload.role

    db.commit()
    db.refresh(user)

    return {
        "message": "Role updated successfully",
        "role": user.role
    }