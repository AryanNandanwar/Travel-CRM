// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Topbar      from "./components/Topbar";
import Sidebar     from "./components/Sidebar";
import Dashboard   from "./pages/Dashboard";
import QueriesPage from "./pages/QueriesPage";
import QueryForm   from "./pages/QueryForm";
import { Login }   from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handlers to pass down
  const handleLogin  = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route
            path="/*"
            element={<Login onLogin={handleLogin} />}
          />
          {/* You can also expose register here if you want */}
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} />}
          />
        </Routes>
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            {/* Pass onLogout into your Topbar */}
            <Topbar onLogout={handleLogout} />

            <div className="p-4 overflow-y-auto flex-1 bg-gray-100">
              <Routes>
                {/* Redirect root → dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/queries" element={<QueriesPage />} />
                <Route path="/queryform" element={<QueryForm />} />

                {/* If they try to hit /login or /register, send them home */}
                <Route path="/login"    element={<Navigate to="/dashboard" replace />} />
                <Route path="/register" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}
