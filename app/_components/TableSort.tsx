import React from "react";
import Select from "./Select";
const SelectContent = [
  "latest",
  "oldest",
  "A to Z",
  "Z to A",
  "highest",
  "lowest",
];
export default function TableSort() {
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-preset-4 text-secondary hidden md:block">
        Sort By
      </label>
      <Select content={SelectContent} value="Sort" />
    </div>
  );
}
