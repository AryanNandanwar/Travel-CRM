// src/components/Topbar.jsx
import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function Topbar({ onLogout }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { logout } = useAuth();


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call your backend logout endpoint, sending cookies
      await axios.post(
        "http://localhost:8000/api/v1/admin/logout",
        {},
        { withCredentials: true }
      );

      // Tell App to flip isAuthenticated → false
      logout()

      // Navigate back to login
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Could not log out. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow px-4 py-5">
      {/* Left: Search */}
      <div className="flex items-center space-x-2">
        <SearchIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
        />
      </div>

      {/* Right: Logout */}
      <div className="flex items-center space-x-4">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            onClick={handleLogout}
            className="text-blue-500 hover:underline"
          >
            Logout
          </a>
        </Typography>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute top-full right-4 mt-1 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
