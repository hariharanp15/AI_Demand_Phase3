class InsightService:

    @staticmethod
    def generate_insights(forecast_data):

        insights = []

        avg_sales = sum(
            item["sales"] for item in forecast_data
        ) / len(forecast_data)

        if avg_sales > 1000:
            insights.append(
                "High growth expected in next quarter"
            )

        else:
            insights.append(
                "Stable demand trend detected"
            )

        return insights