import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider, useUserContext } from "./context/userContext";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppRoutes() {
  const { user, loading } = useUserContext();
  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signin"} />} />
    </Routes>
  );
}

function App() {
  return (
    <UserContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>
  );
}

export default App;
