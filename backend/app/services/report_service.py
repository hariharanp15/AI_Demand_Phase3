import pandas as pd
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


class ReportService:

    @staticmethod
    def export_excel(data, output_path):

        df = pd.DataFrame(data)
        df.to_excel(output_path, index=False)

    @staticmethod
    def export_pdf(text, output_path):

        doc = SimpleDocTemplate(output_path)
        styles = getSampleStyleSheet()

        elements = []

        elements.append(Paragraph(text, styles['Title']))
        elements.append(Spacer(1, 12))

        doc.build(elements)