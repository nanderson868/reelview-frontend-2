import React from "react";
import SmartForm from "_components/SmartForm";
import SmartTable from "_components/SmartTable";

export default function Dashboard() {
  return (
    <div className="panel-group">
      <SmartForm />
      <SmartTable />
    </div>
  );
}
