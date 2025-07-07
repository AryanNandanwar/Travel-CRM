// src/components/Sidebar.jsx
import React from "react";
import {
  HomeIcon,
  CogIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UserGroupIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

export default function Sidebar({ onLinkClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/admin/logout",
      {},
      { withCredentials: true }
    );
    logout();
    navigate("/", { replace: true });
    onLinkClick?.();
  };

  const navItem = (to, Icon, label) => (
    <Link
      to={to}
      onClick={onLinkClick}
      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
    >
      <Icon className="h-5 w-5 text-gray-600" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="h-full flex flex-col bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Travel Dhamaal Holidays
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItem("/", HomeIcon, "Dashboard")}
        {navItem("/queries", CogIcon, "Queries")}
        {navItem("/invoices", DocumentTextIcon, "Invoices")}
        {navItem("/payments", CreditCardIcon, "Payments")}
        {navItem("/clients", UserGroupIcon, "Clients")}

        {user?.role === "admin" &&
          navItem("/users-page", DocumentTextIcon, "Users")}

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 w-full text-left"
        >
          <LogoutIcon className="h-5 w-5 text-gray-600" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
