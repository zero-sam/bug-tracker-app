import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BugList from "./BugList";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateBugPage from "./pages/CreateBugPage";
import "./App.css";

function App() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bugs").then((res) => setBugs(res.data));
  }, []);

  const addBug = (bug) => setBugs([...bugs, bug]);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Redirect to Login as default */}
        <Route path="/" element={<Navigate replace to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Page (Protected) */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage bugs={bugs} addBug={addBug} /> : <Navigate replace to="/login" />}
        />

        {/* Create Bug Page (Protected) */}
        <Route
          path="/createbugs"
          element={isLoggedIn ? <CreateBugPage addBug={addBug} /> : <Navigate replace to="/login" />}
        />

        {/* Bug List Page (Protected) */}
        <Route
          path="/buglist"
          element={isLoggedIn ? <BugList bugs={bugs} /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
