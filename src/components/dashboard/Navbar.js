import React from "react";
import { useUserContext } from "../../context/userContext";
import "./Navbar.css";

const Navbar = ({ onSidebarToggle }) => {
  const { user, logoutUser } = useUserContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button 
          className="sidebar-toggle-nav"
          onClick={onSidebarToggle}
        >
          ☰
        </button>
        <h2>Dashboard</h2>
      </div>
      
      <div className="navbar-user">
        <span className="user-name">{user?.displayName || user?.email}</span>
        <button onClick={logoutUser} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;