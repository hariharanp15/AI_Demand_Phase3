import pandas as pd


class PreprocessService:

    @staticmethod
    def clean_data(filepath):

        if filepath.endswith(".csv"):
            df = pd.read_csv(filepath)
        else:
            df = pd.read_excel(filepath)

        df.drop_duplicates(inplace=True)

        df.fillna(method="ffill", inplace=True)

        return df