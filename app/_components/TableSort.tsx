import { useContext } from "react";
import Select from "./Select";
import { FeaturesStatesContext } from "./TransactionTable";

type sort = {
  id: string;
  desc: boolean;
};
type TableSort = {
  sortingOptions?: { display: string; value: sort }[];
};

export default function TableSort({ sortingOptions }: TableSort) {
  const { setSorting } = useContext(FeaturesStatesContext);

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
