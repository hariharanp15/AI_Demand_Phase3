import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const ForecastChart = ({ data }) => {
  
    return (
      <ResponsiveContainer width="100%" height={300}>
  
        <BarChart data={data}>
  
          <XAxis dataKey="name" />
  
          <YAxis />
  
          <Tooltip />
  
          <Bar dataKey="forecast" fill="#16a34a" />
  
        </BarChart>
  
      </ResponsiveContainer>
    );
  };
  
  export default ForecastChart;