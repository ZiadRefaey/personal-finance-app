import TableControls from "./TableControls";
import { sortingOptions } from "../_lib/constants";
const filterOptions = [
  {
    display: "all transactions",
    value: "all transactions",
  },
  {
    display: "entertainment",
    value: "entertainment",
  },
  {
    display: "bills",
    value: "bills",
  },
  {
    display: "groceries",
    value: "groceries",
  },
  {
    display: "dining out",
    value: "dining out",
  },
  {
    display: "transportation",
    value: "transportation",
  },
  {
    display: "personal care",
    value: "personal care",
  },
];
export default function TransactionsTableControls({
  table,
  setSorting,
}: {
  table: any;
  setSorting: any;
}) {
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
