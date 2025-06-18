import React from "react";
import CardsRow from "../components/Dashboard/CardsRow"
import ChartSection from "../components/Dashboard/ChartSection";
import TablesSection from "../components/Dashboard/TableSection";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {
  return (
    <div>
    
            <CardsRow />

                {/* Chart Section */}
            <ChartSection />

                {/* Tables Section */}
            <TablesSection />
            </div>


  );
}

export default Dashboard;
