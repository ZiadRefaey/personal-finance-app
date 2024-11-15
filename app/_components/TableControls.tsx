import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import TableSort from "./TableSort";
type sort = {
  id: string;
  desc: boolean;
};
type TableControls = {
  table?: any;
  placeHolder: string;
  sortingOptions?: { display: string; value: sort }[];
  filterOptions?: { display: string; value: string }[];
  setSorting?: any;
  hasSearch?: boolean;
  hasSort?: boolean;
  hasFilter?: boolean;
};
export default function TableControls({
  placeHolder,
  table,
  sortingOptions,
  filterOptions,
  setSorting,
  hasSearch = true,
  hasSort = true,
  hasFilter = true,
}: TableControls) {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      {hasSearch && (
        <TableSearch
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeHolder={placeHolder}
        />
      )}
      <div className="flex items-end justify-center gap-2 md:gap-6 flex-col md:flex-row ">
        {hasSort && (
          <TableSort setSorting={setSorting} sortingOptions={sortingOptions} />
        )}
        {hasFilter && <TableFilter filterOptions={filterOptions} />}
      </div>
    </div>
  );
}
