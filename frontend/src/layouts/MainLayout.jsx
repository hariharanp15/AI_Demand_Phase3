// src/layouts/MainLayout.jsx

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;