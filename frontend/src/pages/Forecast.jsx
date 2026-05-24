import { useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

import {
  MdAnalytics,
  MdTrendingUp,
  MdBolt,
} from "react-icons/md";

const Forecast = () => {
  const [forecastData, setForecastData] = useState([
    { month: "March", sales: 59000 },
    { month: "April", sales: 68000 },
    { month: "May", sales: 72000 },
    { month: "June", sales: 82000 },
    { month: "July", sales: 90000 },
    { month: "August", sales: 94000 },
  ]);

  const generateForecast = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/forecast/predict/1",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForecastData(response.data.forecast);
    } catch (error) {
      console.log(error);

      alert("Forecast Failed");
    }
  };

  return (
    <MainLayout>

      <div className="forecast-header">
        <div>
          <h1 className="page-title">
            AI Forecast
          </h1>

          <p className="page-subtitle">
            Predict future demand using
            AI-powered analytics
          </p>
        </div>

        <button
          onClick={generateForecast}
          className="forecast-btn"
        >
          Generate Forecast
        </button>
      </div>


      <div className="forecast-stats">
        <div className="forecast-mini-card">
          <MdAnalytics size={30} />

          <div>
            <h3>Forecast Accuracy</h3>
            <p>96%</p>
          </div>
        </div>

        <div className="forecast-mini-card">
          <MdTrendingUp size={30} />

          <div>
            <h3>Growth Prediction</h3>
            <p>+32%</p>
          </div>
        </div>

        <div className="forecast-mini-card">
          <MdBolt size={30} />

          <div>
            <h3>AI Confidence</h3>
            <p>98%</p>
          </div>
        </div>
      </div>


      <div className="forecast-chart-card">
        <div className="chart-header">
          <div>
            <h2>Forecast Trends</h2>

            <p>
              Future sales demand prediction
              generated using AI models
            </p>
          </div>

          <div className="chart-badge">
            Live Prediction
          </div>
        </div>

        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={forecastData}>
            <CartesianGrid
              stroke="#1F2937"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#EC4899"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#EC4899",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <div className="forecast-chart-card mt">
        <div className="chart-header">
          <div>
            <h2>Forecast Growth Analysis</h2>

            <p>
              AI-generated trend acceleration
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={forecastData}>
            <CartesianGrid
              stroke="#1F2937"
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.25}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </MainLayout>
  );
};

export default Forecast;