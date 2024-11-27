import { useContext } from "react";
import Select from "./Select";
import { TransactionTableContext } from "./TransactionTable";
import { useSetParams } from "../_lib/hooks";

export default function TableFilter({
  filterOptions,
}: {
  filterOptions?: { display: string; value: string }[];
}) {
  const table = useContext(TransactionTableContext);
  const setParams = useSetParams();
  function handleFilter(value: string) {
    if (value === "all transactions")
      table.getColumn("category")?.setFilterValue("");
    else table.getColumn("category")?.setFilterValue(value);
    setParams("filter", value);
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-preset-4 text-secondary hidden md:block">
        Filter
      </label>
      <Select
        items={filterOptions}
        placeholder="Filter"
        valueChange={(value: string) => handleFilter(value)}
      />
    </div>
  );
}
