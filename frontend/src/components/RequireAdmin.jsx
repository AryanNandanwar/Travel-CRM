import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function RequireAdmin({ children }) {
  const { user } = useAuth();

  // if not logged in or not admin, redirect to dashboard
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // otherwise render the protected page
  return <>{children}</>;
}
