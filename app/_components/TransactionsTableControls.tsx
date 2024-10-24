import TableControls from "./TableControls";
const sortingOptions = [
  { display: "latest", value: { id: "date", desc: true } },
  { display: "oldest", value: { id: "date", desc: false } },
  { display: "A to Z", value: { id: "name", desc: false } },
  { display: "Z to A", value: { id: "name", desc: true } },
  { display: "highest", value: { id: "amount", desc: true } },
  { display: "lowest", value: { id: "amount", desc: false } },
];
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
export default function TransactionsTableControls({ table }: { table: any }) {
  return (
    <TableControls
      sortingOptions={sortingOptions}
      filterOptions={filterOptions}
      table={table}
    />
  );
}
