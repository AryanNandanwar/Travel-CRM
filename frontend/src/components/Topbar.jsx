import React from "react";
import {  SearchIcon } from "@heroicons/react/outline";
import { Typography } from "@material-tailwind/react";

function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white shadow px-4 py-2">
      {/* Left: Search */}
      <div className="flex items-center space-x-2">
        <SearchIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
        />
      </div>

      {/* Right: Icons / Profile */}
      <div className="flex items-center space-x-4 p-4">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
              Login
        </Typography>
      </div>
    </div>
  );
}

export default Topbar;
