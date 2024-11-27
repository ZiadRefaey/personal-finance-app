import TableControls from "./TableControls";
import { sortingOptions } from "../_lib/constants";

export default function TransactionsTableControls({
  table,
  setSorting,
  filters = [],
}: {
  filters: string[];
  table: any;
  setSorting: any;
}) {
  const filtersArray = filters?.map((filter) => ({
    display: filter,
    value: filter.toLowerCase(),
  }));
  const filterOptions = [
    {
      display: "all transactions",
      value: "all transactions",
    },
    ...filtersArray,
  ];
  return (
    <TableControls
      setSorting={setSorting}
      placeHolder="Search Transactions"
      sortingOptions={sortingOptions}
      filterOptions={filterOptions}
      table={table}
    />
  );
}
