import TableSearch from "./TableSearch";

export default function TableControls() {
  return (
    <div className="flex items-center justify-between w-full">
      <TableSearch placeHolder="Search Transactions" />
    </div>
  );
}
