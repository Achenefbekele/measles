import React from "react";
import Dashboard from "./components/Dashboard";
import DataTable from "./components/DataTable";
import ReportButton from "./components/ReportButton";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Measles Surveillance Dashboard</h1>
      <Dashboard />
      <DataTable />
      <ReportButton />
    </div>
  );
}

export default App;
