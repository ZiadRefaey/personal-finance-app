import React from "react";
import Select from "./Select";
const SelectContent = [
  "all transactions",
  "entertainment",
  "bills",
  "groceries",
  "dining out",
  "transportation",
  "personal care",
];
export default function TableFilter() {
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-preset-4 text-secondary hidden md:block">
        Filter
      </label>
      <Select content={SelectContent} value="All Transactions" />
    </div>
  );
}
