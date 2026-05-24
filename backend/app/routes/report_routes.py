from fastapi import APIRouter
from fastapi.responses import FileResponse

from reportlab.pdfgen import canvas

import pandas as pd

import os

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

# =========================================
# PDF REPORT
# =========================================

@router.get("/pdf")
def download_pdf():

    file_path = "forecast-report.pdf"

    c = canvas.Canvas(file_path)

    c.setFont("Helvetica-Bold", 22)

    c.drawString(
        180,
        800,
        "AI Forecast Report"
    )

    c.setFont("Helvetica", 14)

    c.drawString(
        100,
        730,
        "Revenue Forecast: ₹2.3Cr"
    )

    c.drawString(
        100,
        700,
        "Forecast Accuracy: 96%"
    )

    c.drawString(
        100,
        670,
        "Growth Prediction: +32%"
    )

    c.save()

    return FileResponse(
        path=file_path,
        filename="forecast-report.pdf",
        media_type="application/pdf"
    )


# =========================================
# EXCEL REPORT
# =========================================

@router.get("/excel")
def download_excel():

    data = {
        "Month": [
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb"
        ],

        "Sales": [
            40000,
            50000,
            55000,
            65000,
            76000,
            82000
        ]
    }

    df = pd.DataFrame(data)

    file_path = "forecast-report.xlsx"

    df.to_excel(
        file_path,
        index=False
    )

    return FileResponse(
        path=file_path,
        filename="forecast-report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )