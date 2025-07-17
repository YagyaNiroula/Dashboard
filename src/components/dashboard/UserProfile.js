import React from "react";
import { useUserContext } from "../../context/userContext";
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <div className="user-profile-widget">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserProfile; 