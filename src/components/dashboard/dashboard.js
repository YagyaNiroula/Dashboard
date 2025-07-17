import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile";
import UserList from "./UserList";
import WeatherWidget from "../API/WeatherWidget";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useUserContext();
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="dashboard-section">
            <WeatherWidget />
          </div>
        );
      case "users":
        return (
          <div className="widget-section">
            <h2>User Management</h2>
            <UserList />
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <div className="sidebar">
          <button
            className={`sidebar-btn ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`sidebar-btn ${activeSection === "users" ? "active" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </button>
        </div>
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 