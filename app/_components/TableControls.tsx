import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import TableSort from "./TableSort";

export default function TableControls({
  hasSearch = true,
  hasSort = true,
  hasFilter = true,
}: {
  hasSearch?: boolean;
  hasSort?: boolean;
  hasFilter?: boolean;
}) {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      {hasSearch && <TableSearch placeHolder="Search Transactions" />}
      <div className="flex items-end justify-center gap-2 md:gap-6 flex-col md:flex-row ">
        {hasSort && <TableSort />}
        {hasFilter && <TableFilter />}
      </div>
    </div>
  );
}
