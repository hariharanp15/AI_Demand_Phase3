from pydantic import BaseModel


class PredictionResponse(BaseModel):
    product_name: str
    predicted_sales: float
    forecast_date: str