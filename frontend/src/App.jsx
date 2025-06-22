// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard    from "./pages/Dashboard";
import QueriesPage  from "./pages/QueriesPage";
import QueryForm    from "./pages/QueryForm";
import UpdateForm   from "./components/forms/UpdateForm";
import FollowUpPage from "./pages/FollowUpPage";
import { Login }    from "./pages/Login";
import { Register } from "./pages/Register";
import UsersPage from "./pages/Users";

import { AuthProvider, useAuth } from "./AuthContext";
import AppLayout    from "./components/AppLayout";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/*"      element={<Login    />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* wrap all authenticated/admin pages in your layout */}
      <Route element={<AppLayout />}>
        {/* redirect / → /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* actual pages */}
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/queries"    element={<QueriesPage />} />
        <Route path="/queryform"  element={<QueryForm />} />
        <Route path="/updateform/:id" element={<UpdateForm />} />
        <Route path="/follow-up/:id" element={<FollowUpPage />} />
        <Route path="/users-page"    element={<UsersPage />} />
      </Route>
    </Routes>
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
