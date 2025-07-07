// src/components/AppLayout.jsx
import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/*** DESKTOP: fixed sidebar ***/}
      <div className="hidden md:block">
        <div className="fixed inset-y-0 left-0 z-30 w-64">
          <Sidebar />
        </div>
      </div>

      {/*** MOBILE BACKDROP ***/}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/*** MOBILE: off‑canvas drawer ***/}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md
          transform transition-transform duration-200 ease-in-out
          md:hidden
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onLinkClick={() => setDrawerOpen(false)} />
      </div>

      {/*** MAIN CONTENT *** */}
      <div className="flex-1 flex flex-col">
        {/* mobile top bar */}
        <header className="md:hidden flex items-center bg-white shadow p-2">
          <button
            className="p-2 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="ml-2 text-xl font-semibold">Travel Dhamaal</h1>
        </header>

        {/* on desktop, push content right by exactly 16rem (w‑64) */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
