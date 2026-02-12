import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaCreditCard,
  FaUser,
  FaCog,
  FaLifeRing,
} from "react-icons/fa";

const UserSidebar = () => {

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "white",
    backgroundColor: isActive ? "#9b59b6" : "transparent",
    transition: "0.3s ease",
    fontWeight: 500,
  });

  return (
    <div style={{
        height: "100vh",
        width: "360px",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #71b7e6 0%, #9b59b6 100%)",
        boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
        paddingTop: "15px",
      }}>
      
      <div style={{
          textAlign: "center",
          marginBottom: "20px",
          display:"flex",
          justifyContent: "center",
          alignItems:"center"
        }}>
        <div style={{paddingLeft:"20px"}}>
          <img
          src="/image.svg"
          alt="Journal Hub Logo"
          style={{
            height: "160px",
            width: "160px",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
        </div>
        <h3
          style={{
            fontSize: "54px",
            fontWeight: 600,
            color: "white",
            fontFamily: "'Pacifico', cursive",
            letterSpacing: "2.5px",
          }}
        >
          Journal Hub
        </h3>
      </div>

      <div style={{ fontSize:"25px", padding: "0 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <NavLink
          to="/userdashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/userdashboard/browse"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaBookOpen />
          <span>Browse Journals</span>
        </NavLink>

        <NavLink
          to="/userdashboard/subscriptions"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaBookOpen />
          <span>My Subscriptions</span>
        </NavLink>

        <NavLink
          to="/userdashboard/payments"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaCreditCard />
          <span>Payments</span>
        </NavLink>

        <NavLink
          to="/userdashboard/profile"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/userdashboard/settings"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/userdashboard/support"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-500" : ""} flex items-center space-x-4 px-4 py-2.5 rounded hover:bg-blue-700`
          }
        >
          <FaLifeRing />
          <span>Support</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserSidebar;
