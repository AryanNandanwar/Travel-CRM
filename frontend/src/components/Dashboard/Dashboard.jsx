import React from "react";
import CardsRow from "./CardsRow";
import ChartSection from "./ChartSection";
import TablesSection from "./TableSection";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Cards Row */}
      <CardsRow />

      {/* Chart Section */}
      <ChartSection />

      {/* Tables Section */}
      <TablesSection />
    </div>
  );
}

export default Dashboard;
