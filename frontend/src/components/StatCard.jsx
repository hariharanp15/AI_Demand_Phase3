
const StatCard = ({
    title,
    value,
    icon,
    gradient,
  }) => {
    return (
      <div className={`stat-card ${gradient}`}>
        <div className="stat-top">
          <div>
            <p className="stat-title">{title}</p>
            <h1 className="stat-value">{value}</h1>
          </div>
  
          <div className="stat-icon">
            {icon}
          </div>
        </div>
      </div>
    );
  };
  
  export default StatCard;