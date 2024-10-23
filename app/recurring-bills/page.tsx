import React from "react";
import TotalBillsCard from "../_components/TotalBillsCard";
import BillsSummaryCard from "../_components/BillsSummaryCard";
import Card from "../_components/Card";
import TableControls from "../_components/TableControls";
import BillsTable from "../_components/BillsTable";

export default function page() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Recurring Bills</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[337px,1fr] gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 xl:grid-cols-1">
          <TotalBillsCard />
          <BillsSummaryCard />
        </div>
        <Card>
          {/* <TableControls hasFilter={false} hasSort={false} /> */}
          <BillsTable />
        </Card>
      </div>
    </>
  );
}
