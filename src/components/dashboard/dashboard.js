// Import React and state management
import React, { useState } from "react";
// Import our user authentication context
import { useUserContext } from "../../context/userContext";
// Import dashboard components
import Navbar from "./Navbar";
import UserList from "./UserList";
// Import our custom widgets
import WeatherWidget from "../API/WeatherWidget";
import StockWidget from "../API/StockWidget";
import CalculatorWidget from "../custom_tools/CalculatorWidget";
import CalendarWidget from "../custom_tools/CalendarWidget";
import MovieWidget from "../API/MovieWidget";

import "./Dashboard.css";

// Main Dashboard component that manages the entire dashboard interface
const Dashboard = () => {
  // Get current user from authentication context
  const { user } = useUserContext();
  // State to track which section is currently active 
  const [activeSection, setActiveSection] = useState("dashboard");
  // State to track if sidebar is open or closed
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to render different sections based on what the user clicked in the sidebar
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        // Main dashboard shows the weather widget, stock widget, and movie widget
        return (
          <div className="dashboard-section">
            <div className="widgets-grid">
              <WeatherWidget />
              <StockWidget />
              <MovieWidget />
            </div>
          </div>
        );
      case "users":
        // Users section shows user management interface
        return (
          <div className="widget-section">
            <h2>User Management</h2>
            <UserList />
          </div>
        );
      case "calculator":
        // Calculator section shows the calculator tool
        return (
          <div className="widget-section">
            <CalculatorWidget />
          </div>
        );
      case "calendar":
        // Calendar section shows the calendar tool
        return (
          <div className="widget-section">
            <CalendarWidget />
          </div>
        );
      default:
        // Fallback for unknown sections
        return <div>Section not found</div>;
    }
  };

  // Render the main dashboard layout
  return (
    <div className="dashboard-container">
      {/* Top navigation bar with user info and logout */}
      <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="dashboard-content">
        
        {/* Left sidebar with navigation buttons */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Dashboard button - shows weather widget */}
          <button
            className={`sidebar-btn ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          {/* Users button - shows user management */}
          <button
            className={`sidebar-btn ${activeSection === "users" ? "active" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </button>
          {/* Calculator button - shows calculator tool */}
          <button
            className={`sidebar-btn ${activeSection === "calculator" ? "active" : ""}`}
            onClick={() => setActiveSection("calculator")}
          >
            Calculator
          </button>
          {/* Calendar button - shows calendar tool */}
          <button
            className={`sidebar-btn ${activeSection === "calendar" ? "active" : ""}`}
            onClick={() => setActiveSection("calendar")}
          >
            Calendar
          </button>
        </div>
        
        {/* Main content area that shows the selected section */}
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 