const StatCard = ({
    title,
    value,
    icon
  }) => {
  
    return (
  
      <div className="stat-card">
  
        <div className="stat-top">
  
          <div>
  
            <p className="stat-title">
              {title}
            </p>
  
            <h2 className="stat-value">
              {value}
            </h2>
  
          </div>
  
          {icon}
  
        </div>
  
      </div>
    );
  };
  
  export default StatCard;