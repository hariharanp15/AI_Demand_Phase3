import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.ensemble import IsolationForest
from sklearn.metrics import mean_absolute_error

class ForecastService:

    @staticmethod
    def load_dataset(filepath):
        df = pd.read_csv(filepath)

        if "sales" not in df.columns:
            raise Exception("CSV must contain sales column")

        return df

    @staticmethod
    def detect_seasonality(df):
        df["rolling_mean"] = df["sales"].rolling(window=3).mean()

        trend = "Stable"

        if df["sales"].iloc[-1] > df["sales"].mean():
            trend = "Increasing"

        return {
            "trend": trend,
            "average_sales": float(df["sales"].mean())
        }

    @staticmethod
    def detect_anomalies(df):

        model = IsolationForest(contamination=0.05)

        df["anomaly"] = model.fit_predict(df[["sales"]])

        anomalies = df[df["anomaly"] == -1]

        return anomalies.to_dict(orient="records")

    @staticmethod
    def ensemble_forecast(filepath):

        df = ForecastService.load_dataset(filepath)

        X = np.array(range(len(df))).reshape(-1, 1)
        y = df["sales"]

        models = {
            "linear": LinearRegression(),
            "rf": RandomForestRegressor(n_estimators=100),
            "gboost": GradientBoostingRegressor()
        }

        predictions = []

        for name, model in models.items():
            model.fit(X, y)

            future = np.array(range(len(df), len(df) + 6)).reshape(-1, 1)

            pred = model.predict(future)

            predictions.append(pred)
        final_prediction = np.mean(predictions, axis=0)

        result = []

        for i, value in enumerate(final_prediction):
            result.append({
                "month": f"Month {len(df) + i + 1}",
                "sales": round(float(value), 2)
            })

        return {
            "forecast": result,
            "seasonality": ForecastService.detect_seasonality(df),
            "anomalies": ForecastService.detect_anomalies(df)
        }