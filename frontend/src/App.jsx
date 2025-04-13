// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard   from "./pages/Dashboard";
import QueriesPage from "./pages/QueriesPage";
import QueryForm   from "./pages/QueryForm";
import { Login }   from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider, useAuth } from "./AuthContext";


function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    !isAuthenticated ? (
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    ) : (
          <div className="flex justify-center p-4 flex-1 bg-gray-100">

            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/queries" element={<QueriesPage />} />
              <Route path="/queryform" element={<QueryForm />} />
            </Routes>

          </div>

    )
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}