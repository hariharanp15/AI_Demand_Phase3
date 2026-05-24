from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset
from app.dependencies import get_current_user
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/analytics/{dataset_id}")
def get_analytics(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()

    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    result = DashboardService.analytics(dataset.filepath)

    return result