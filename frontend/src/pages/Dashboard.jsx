import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import StatCard from "../components/StatCard";

import {
  MdTrendingUp,
  MdAttachMoney,
  MdInventory,
  MdAnalytics,
} from "react-icons/md";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.remove("light-mode");

    } else {

      document.body.classList.add("light-mode");
    }

  }, [darkMode]);


  const [salesFilter, setSalesFilter] =
    useState("Last 6 Months");


  const salesData = [
    { month: "Sep", sales: 40000 },
    { month: "Oct", sales: 50000 },
    { month: "Nov", sales: 55000 },
    { month: "Dec", sales: 65000 },
    { month: "Jan", sales: 76000 },
    { month: "Feb", sales: 82000 },
  ];

  const productData = [
    { name: "Laptop", value: 450 },
    { name: "Mobile", value: 320 },
    { name: "TV", value: 220 },
    { name: "Watch", value: 180 },
    { name: "Camera", value: 150 },
  ];

  const growthData = [
    { month: "Sep", users: 200 },
    { month: "Oct", users: 350 },
    { month: "Nov", users: 500 },
    { month: "Dec", users: 800 },
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1600 },
  ];



  
  return (
    <MainLayout>


      <div className="dashboard-header">

        <div>

          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-subtitle">
            Welcome back to your AI analytics platform
          </p>

        </div>


        

      </div>



      <div className="stats-grid">

        <StatCard
          title="Total Revenue"
          value="₹2.3Cr"
          icon={<MdAttachMoney size={34} />}
          gradient="pink-gradient"
        />

        <StatCard
          title="Forecast Accuracy"
          value="96%"
          icon={<MdAnalytics size={34} />}
          gradient="dark-card"
        />

        <StatCard
          title="Products"
          value="24"
          icon={<MdInventory size={34} />}
          gradient="dark-card"
        />

        <StatCard
          title="Revenue Growth"
          value="+32%"
          icon={<MdTrendingUp size={34} />}
          gradient="blue-gradient"
        />

      </div>




      <div className="chart-grid">


        <div className="chart-card">

          <div className="chart-header">

            <div>

              <h2>Monthly Sales Trends</h2>

              <p>
                Revenue and demand insights
              </p>

            </div>

            <select
              className="chart-filter"
              value={salesFilter}
              onChange={(e) =>
                setSalesFilter(e.target.value)
              }
            >

              <option>
                Last 6 Months
              </option>

              <option>
                Last Year
              </option>

              <option>
                Custom
              </option>

            </select>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart data={salesData}>

              <CartesianGrid stroke="#1F2937" />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#C084FC"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>




        <div className="chart-card">

          <div className="chart-header">

            <div>

              <h2>Top Products</h2>

              <p>
                Best selling products
              </p>

            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={productData}>

              <CartesianGrid stroke="#1F2937" />

              <XAxis
                dataKey="name"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#EC4899"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>




      <div className="chart-card mt">

        <div className="chart-header">

          <div>

            <h2>User Growth Analytics</h2>

            <p>
              Platform user engagement
            </p>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <AreaChart data={growthData}>

            <CartesianGrid stroke="#1F2937" />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </MainLayout>
  );
};

export default Dashboard;