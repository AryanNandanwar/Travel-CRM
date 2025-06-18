// src/components/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* everything rendered by your routes will go here */}
      <main className="ml-64 flex-1 overflow-y-auto bg-gray-100 p-4">
        {/* <Outlet> is where the child-route element will render */}
        <Outlet />
      </main>
    </div>
  );
}
