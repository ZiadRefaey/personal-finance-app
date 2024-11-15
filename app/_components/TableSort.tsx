import Select from "./Select";

type sort = {
  id: string;
  desc: boolean;
};
type TableSort = {
  sortingOptions?: { display: string; value: sort }[];
  setSorting: any;
};

export default function TableSort({ sortingOptions, setSorting }: TableSort) {
  function handleSortingChange(sortingOptions: sort) {
    setSorting([{ id: sortingOptions.id, desc: sortingOptions.desc }]);
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-preset-4 text-secondary hidden md:block">
        Sort By
      </label>
      <Select
        items={sortingOptions}
        placeholder="Sort"
        valueChange={handleSortingChange}
      />
    </div>
  );
}
