import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <main className="main-content">
          <div className="dashboard-section">
            <h2>Welcome to Your Dashboard</h2>
            <UserProfile />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 