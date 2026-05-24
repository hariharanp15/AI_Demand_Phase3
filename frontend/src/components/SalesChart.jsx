import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  const SalesChart = ({ data }) => {
  
    return (
      <ResponsiveContainer width="100%" height={300}>
  
        <LineChart data={data}>
  
          <CartesianGrid strokeDasharray="3 3" />
  
          <XAxis dataKey="month" />
  
          <YAxis />
  
          <Tooltip />
  
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2563eb"
          />
  
        </LineChart>
  
      </ResponsiveContainer>
    );
  };
  
  export default SalesChart;