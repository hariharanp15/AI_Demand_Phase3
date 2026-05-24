from apscheduler.schedulers.background import BackgroundScheduler
from app.services.forecast_service import ForecastService

scheduler = BackgroundScheduler()


def retrain_models():
    print("Retraining forecasting models...")

scheduler.add_job(retrain_models, "interval", hours=6)
scheduler.start()