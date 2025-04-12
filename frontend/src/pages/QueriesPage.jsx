import React from "react";
import StatusCards from "../components/QueriesPage/StatusCards";
import QueryTable from "../components/QueriesPage/QueriesTable";


const QueriesPage = () => {
  return (

              <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}

                  <div className="p-4 space-y-4">
                    <StatusCards />
                    <QueryTable />
                  </div>
              </div>


  );
};

export default QueriesPage;
