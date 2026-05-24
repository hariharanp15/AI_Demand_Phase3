const ChartCard = ({
    title,
    children
  }) => {
  
    return (
  
      <div className="chart-card">
  
        <div className="chart-header">
  
          <h2>{title}</h2>
  
          <select className="chart-filter">
  
            <option>Monthly</option>
            <option>Yearly</option>
  
          </select>
  
        </div>
  
        {children}
  
      </div>
    );
  };
  
  export default ChartCard;