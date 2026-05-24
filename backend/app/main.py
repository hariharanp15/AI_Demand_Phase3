from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.dataset_routes import router as dataset_router
from app.routes.forecast_routes import router as forecast_router
from app.routes.realtime_routes import router as realtime_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.monitor_routes import router as monitor_router
from app.routes.admin_routes import router as admin_router
from app.routes.report_routes import router as report_router

app = FastAPI(title="Advanced AI Forecasting System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(dataset_router)
app.include_router(forecast_router)
app.include_router(realtime_router)
app.include_router(analytics_router)
app.include_router(monitor_router)
app.include_router(admin_router)
app.include_router(report_router)

@app.get("/")
def home():
    return {
        "message": "Advanced AI Forecast API Running"
    }