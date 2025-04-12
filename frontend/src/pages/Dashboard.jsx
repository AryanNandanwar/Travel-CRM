import React from "react";
import CardsRow from "../components/Dashboard/CardsRow"
import ChartSection from "../components/Dashboard/ChartSection";
import TablesSection from "../components/Dashboard/TableSection";


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
