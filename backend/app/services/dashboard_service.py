import pandas as pd


class DashboardService:

    @staticmethod
    def analytics(filepath):

        df = pd.read_csv(filepath)

        total_sales = df["sales"].sum()
        average_sales = df["sales"].mean()
        top_product = None

        if "product" in df.columns:
            top_product = (
                df.groupby("product")["sales"]
                .sum()
                .idxmax()
            )

        return {
            "total_sales": float(total_sales),
            "average_sales": float(average_sales),
            "top_product": top_product
        }