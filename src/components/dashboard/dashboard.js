import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import UserList from "./UserList";
import WeatherWidget from "../API/WeatherWidget";
import CalculatorWidget from "../API/CalculatorWidget";
import CalendarWidget from "../API/CalendarWidget";

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
      case "calculator":
        return (
          <div className="widget-section">
            <CalculatorWidget />
          </div>
        );
      case "calendar":
        return (
          <div className="widget-section">
            <CalendarWidget />
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
          <button
            className={`sidebar-btn ${activeSection === "calculator" ? "active" : ""}`}
            onClick={() => setActiveSection("calculator")}
          >
            Calculator
          </button>
          <button
            className={`sidebar-btn ${activeSection === "calendar" ? "active" : ""}`}
            onClick={() => setActiveSection("calendar")}
          >
            Calendar
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