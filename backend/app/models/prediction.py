from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from app.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(255))
    predicted_sales = Column(Float)
    forecast_date = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)