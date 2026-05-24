from fastapi import Depends, HTTPException

from app.dependencies import get_current_user


def role_required(roles: list):

    def verify_role(
        current_user=Depends(
            get_current_user
        )
    ):

        if current_user.role not in roles:

            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

        return current_user

    return verify_role