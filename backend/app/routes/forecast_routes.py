from fastapi import APIRouter
import random

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


# -----------------------------
# Forecast API
# -----------------------------

@router.post("/predict/{dataset_id}")
def predict_sales(dataset_id: int):

    months = [
        "March",
        "April",
        "May",
        "June",
        "July",
        "August"
    ]

    forecast_data = []

    sales = 50000

    for month in months:

        sales += random.randint(3000, 12000)

        forecast_data.append({
            "month": month,
            "sales": sales
        })

    return {
        "dataset_id": dataset_id,
        "forecast": forecast_data
    }


# -----------------------------
# Test Route
# -----------------------------

@router.get("/")
def forecast_home():

    return {
        "message": "Forecast Route Working"
    }