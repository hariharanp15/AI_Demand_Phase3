from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    # Replace with JWT verification logic

    fake_user = {
        "id": 1,
        "username": "admin",
        "role": "Super Admin"
    }

    class UserObject:
        pass

    user = UserObject()

    user.id = fake_user["id"]
    user.username = fake_user["username"]
    user.role = fake_user["role"]

    return user