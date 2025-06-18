// src/pages/QueriesPage.jsx
import React from "react";
import StatusCards from "../components/QueriesPage/StatusCards";
import QueryTable from "../components/QueriesPage/QueriesTable";

export default function QueriesPage() {
  return (
    <>
      <StatusCards />
      <QueryTable />
    </>
  );
}
