// Import React and routing components
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Import our custom user context for authentication
import { UserContextProvider, useUserContext } from "./context/userContext";
// Import authentication and dashboard components
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

// Component that handles all the routing logic
function AppRoutes() {
  // Get current user and loading state from our authentication context
  const { user, loading } = useUserContext();
  
  // Show loading screen while checking authentication status
  if (loading) return <div>Loading...</div>;
  
  return (
    <Routes>
      {/* Sign In page - only show if user is NOT logged in, otherwise redirect to dashboard */}
      <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/dashboard" />} />
      
      {/* Sign Up page - only show if user is NOT logged in, otherwise redirect to dashboard */}
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      
      {/* Dashboard page - only show if user IS logged in, otherwise redirect to sign in */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
      
      {/* Catch all other routes and redirect based on login status */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signin"} />} />
    </Routes>
  );
}

// Main App component that wraps everything with authentication context and routing
function App() {
  return (
    // Wrap everything with our user authentication context
    <UserContextProvider>
      {/* Set up routing for the entire application */}
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>
  );
}

export default App;
