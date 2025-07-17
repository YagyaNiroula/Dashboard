import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import "./UserList.css";

const UserList = () => {
  const { getAllUsers } = useUserContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      console.log("Fetching users...");
      const userList = await getAllUsers();
      console.log("Users fetched:", userList);
      setUsers(userList);
      setLoading(false);
    };

    fetchUsers();
  }, [getAllUsers]);

  if (loading) {
    return (
      <div className="user-list-widget">
        <div className="loading-state">
          <h3>Loading users...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-widget">
      <div className="user-list-header">
        <h3>Registered Users</h3>
        <span className="user-count">{users.length}</span>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <div className="user-name">{user.displayName || "N/A"}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <div className="user-date">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;