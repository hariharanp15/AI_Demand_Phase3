import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdUploadFile,
  MdAnalytics,
  MdAssessment,
  MdAdminPanelSettings,
} from "react-icons/md";

const Sidebar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={22} />,
      path: "/dashboard",
    },
    {
      title: "Upload Dataset",
      icon: <MdUploadFile size={22} />,
      path: "/upload",
    },
    {
      title: "Forecast",
      icon: <MdAnalytics size={22} />,
      path: "/forecast",
    },
    {
      title: "Reports",
      icon: <MdAssessment size={22} />,
      path: "/reports",
    },
  ];

  // ADD ADMIN MENU ONLY FOR SUPER ADMIN
  if (
    user &&
    user.role === "Super Admin"
  ) {
    menuItems.push({
      title: "Admin",
      icon: (
        <MdAdminPanelSettings size={22} />
      ),
      path: "/admin",
    });
  }

  return (

    <div className="sidebar">

      <div>

        <h1 className="logo">
          AI Forecast
        </h1>

        <div className="menu">

          {menuItems.map((item, index) => (

            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active-menu"
                  : "menu-item"
              }
            >

              {item.icon}

              <span>{item.title}</span>

            </NavLink>

          ))}

        </div>

      </div>

      <div className="sidebar-footer">
        <p>AI Forecast v1.0</p>
      </div>

    </div>
  );
};

export default Sidebar;