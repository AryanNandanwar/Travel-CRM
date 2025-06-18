import React from "react";
import CardsRow from "../components/Dashboard/CardsRow"
import ChartSection from "../components/Dashboard/ChartSection";
import TablesSection from "../components/Dashboard/TableSection";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {
  return (
    <div className="flex h-screen">
    <Sidebar />
      <div className="flex flex-col flex-1">

          <div className="space-y-6">
                {/* Cards Row */}
            <CardsRow />

                {/* Chart Section */}
            <ChartSection />

                {/* Tables Section */}
            <TablesSection />
            </div>
      </div>
    </div>

  );
}

export default Dashboard;
