import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import TableSort from "./TableSort";

export default function TableControls() {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <TableSearch placeHolder="Search Transactions" />
      <div className="flex items-end justify-center gap-2 md:gap-6 flex-col md:flex-row ">
        <TableSort />
        <TableFilter />
      </div>
    </div>
  );
}
