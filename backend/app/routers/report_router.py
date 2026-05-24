import os
from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.report_service import ReportService

router = APIRouter(prefix="/reports", tags=["Reports"])

REPORT_DIR = "app/reports"
os.makedirs(REPORT_DIR, exist_ok=True)


@router.get("/excel")
def generate_excel_report():

    data = [
        {
            "Product": "Laptop",
            "Forecast": 500
        },
        {
            "Product": "Phone",
            "Forecast": 800
        }
    ]

    filepath = os.path.join(REPORT_DIR, "forecast_report.xlsx")

    ReportService.export_excel(data, filepath)

    return FileResponse(filepath)


@router.get("/pdf")
def generate_pdf_report():

    filepath = os.path.join(REPORT_DIR, "forecast_report.pdf")

    ReportService.export_pdf(
        "AI Forecast Report",
        filepath
    )

    return FileResponse(filepath)