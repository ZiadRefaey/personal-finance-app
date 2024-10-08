import React from "react";
import Button from "../_components/Button";
import DataTable from "../_components/DataTable";

export default function page() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Transactions</h1>
        <Button>New Transaction</Button>
      </div>
      <DataTable />
    </>
  );
}
