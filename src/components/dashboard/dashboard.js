import React from "react";
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>
        Welcome, <strong>{user?.displayName || user?.email || "User"}</strong>!
      </p>
      <button onClick={logoutUser}>Logout</button>
      <div style={{ marginTop: "2rem" }}>
        <h2>Your Dashboard Content</h2>
        <p>This is a placeholder for your dashboard features.</p>
      </div>
    </div>
  );
};

export default Dashboard; 