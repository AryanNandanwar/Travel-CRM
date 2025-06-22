import React, { useState } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UserGroupIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

function Sidebar() {
  const { user, logout } = useAuth();   // grab user and logout
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/admin/logout",
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Could not log out. Please try again.");
    }
  };

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen fixed left-0 top-0 bottom-0">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Travel Dhamaal Holidays
        </h1>
      </div>

      {error && (
        <div className="p-2 text-red-600 text-sm">{error}</div>
      )}

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
            <HomeIcon className="h-5 w-5 text-gray-600" />
            <Link to="/" className="flex-1">Dashboard</Link>
          </li>

          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
            <CogIcon className="h-5 w-5 text-gray-600" />
            <Link to="/queries" className="flex-1">Queries</Link>
          </li>

          {/* only show Users link if role is 'admin' */}
          {user?.role === "admin" && (
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <DocumentTextIcon className="h-5 w-5 text-gray-600" />
              <Link to="/users-page" className="flex-1">Users</Link>
            </li>
          )}

          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
            <CreditCardIcon className="h-5 w-5 text-gray-600" />
            <Link to="/payments" className="flex-1">Payments</Link>
          </li>

          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
            <UserGroupIcon className="h-5 w-5 text-gray-600" />
            <Link to="/clients" className="flex-1">Clients</Link>
          </li>

          <li
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <CogIcon className="h-5 w-5 text-gray-600" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
