import MainLayout from "../layouts/MainLayout";

import {
  MdPictureAsPdf,
  MdTableChart,
  MdDownload,
} from "react-icons/md";

import axios from "axios";

const Reports = () => {
  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/reports/pdf",
        {
          responseType: "blob",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "forecast-report.pdf"
      );

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);

      alert("PDF Download Failed");
    }
  };

  const downloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/reports/excel",
        {
          responseType: "blob",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "forecast-report.xlsx"
      );

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);

      alert("Excel Download Failed");
    }
  };

  return (
    <MainLayout>
      <div className="reports-header">
        <div>
          <h1 className="page-title">
            AI Reports
          </h1>

          <p className="page-subtitle">
            Download analytics reports in
            multiple formats
          </p>
        </div>
      </div>

      <div className="reports-grid">

        <div className="report-card">
          <div className="report-icon pdf">
            <MdPictureAsPdf size={42} />
          </div>

          <h2>PDF Report</h2>

          <p>
            Download full AI forecasting
            analytics report as PDF
          </p>

          <button
            onClick={downloadPDF}
            className="report-btn"
          >
            <MdDownload />

            Download PDF
          </button>
        </div>


        <div className="report-card">
          <div className="report-icon excel">
            <MdTableChart size={42} />
          </div>

          <h2>Excel Report</h2>

          <p>
            Export forecasting data and
            analytics in Excel format
          </p>

          <button
            onClick={downloadExcel}
            className="report-btn excel-btn"
          >
            <MdDownload />

            Download Excel
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;