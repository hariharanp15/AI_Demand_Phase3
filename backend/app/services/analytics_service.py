import pandas as pd

class AnalyticsService:

    @staticmethod
    def region_analysis(filepath):

        df = pd.read_csv(filepath)

        return (
            df.groupby("region")["sales"]
            .sum()
            .reset_index()
            .to_dict(orient="records")
        )

    @staticmethod
    def category_analysis(filepath):

        df = pd.read_csv(filepath)

        return (
            df.groupby("category")["sales"]
            .sum()
            .reset_index()
            .to_dict(orient="records")
        )

    @staticmethod
    def revenue_prediction(filepath):

        df = pd.read_csv(filepath)

        total = float(df["sales"].sum())

        predicted = total * 1.12

        return {
            "current_revenue": total,
            "predicted_revenue": predicted
        }

    @staticmethod
    def inventory_risk(filepath):

        df = pd.read_csv(filepath)

        low_sales = df[df["sales"] < df["sales"].mean()]

        return low_sales.to_dict(orient="records")