from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.dataset import Dataset
from app.dependencies import get_current_user
from app.services.forecast_service import ForecastService

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


@router.post("/predict/{dataset_id}")
def predict_sales(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    predictions = ForecastService.train_model(
        dataset.filepath
    )

    return {
        "forecast": predictions
    }