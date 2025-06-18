import React from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  UserGroupIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    <div className="w-64 bg-white shadow-md flex flex-col h-screen fixed left-0 top-0 bottom-0">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Travel Dhamaal Holidays</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <HomeIcon className="h-5 w-5 text-gray-600" />
            <span>
              <Link to="/">Dashboard</Link>
              </span>
          </li>
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <CogIcon className="h-5 w-5 text-gray-600" />
           
              <span> 
              <Link to="/queries">Queries  </Link>
              </span>
           
            
          </li>
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <DocumentTextIcon className="h-5 w-5 text-gray-600" />
            
            <span>Invoices</span>
          </li>
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <CreditCardIcon className="h-5 w-5 text-gray-600" />
            <span>Payments</span>
          </li>
          <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <UserGroupIcon className="h-5 w-5 text-gray-600" />
            <span>Customers</span>
          </li>
          <li 
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <CogIcon className="h-5 w-5 text-gray-600" />
            <span>Logout</span>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
