from fastapi import APIRouter
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"])

FILE_PATH = "app/uploads/sales_data.csv"

@router.get("/regions")
def region_data():
    return AnalyticsService.region_analysis(FILE_PATH)

@router.get("/categories")
def category_data():
    return AnalyticsService.category_analysis(FILE_PATH)

@router.get("/revenue")
def revenue_prediction():
    return AnalyticsService.revenue_prediction(FILE_PATH)

@router.get("/inventory-risk")
def inventory_risk():
    return AnalyticsService.inventory_risk(FILE_PATH)