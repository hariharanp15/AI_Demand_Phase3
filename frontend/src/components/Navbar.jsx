import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();


  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.remove(
        "light-mode"
      );

    } else {

      document.body.classList.add(
        "light-mode"
      );
    }

  }, [darkMode]);

  
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="navbar">



      <div>

        <h2 className="navbar-title">
          AI Demand Forecasting
        </h2>

        <p className="navbar-subtitle">
          Smart analytics dashboard
        </p>

      </div>


      <div className="profile-section">

 

        <button
          className="theme-toggle"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {
            darkMode
              ? "Light Mode"
              : "Dark Mode"
          }
        </button>

  

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;