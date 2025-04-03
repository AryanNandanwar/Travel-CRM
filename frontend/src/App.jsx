import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar"
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="p-4 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
