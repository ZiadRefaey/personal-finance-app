import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrev,
} from "./Pagination";

export default function TablePagination({ table }: { table: any }) {
  return (
    <Pagination className="mt-6">
      <PaginationItem
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="w-auto md:px-4"
      >
        <PaginationPrev />
      </PaginationItem>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <PaginationItem
            className={`${
              table.getState().pagination.pageIndex === index
                ? "bg-primary border-primary text-card-back-ground"
                : "text-primary"
            }`}
            onClick={() => table.setPageIndex(index)}
            key={index}
          >
            {index + 1}
          </PaginationItem>
        ))}
      </div>
      <PaginationItem
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="w-auto md:px-4"
      >
        <PaginationNext />
      </PaginationItem>
    </Pagination>
  );
}
