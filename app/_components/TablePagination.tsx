import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TablePagination() {
  return (
    <Pagination>
      <PaginationContent className="w-full flex items-center justify-between mt-6">
        <PaginationItem className="md:w-auto md:px-4">
          <PaginationPrevious href="#" />
        </PaginationItem>
        <div className="flex items-center justify-center gap-2">
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem className="p-0 size-10">
            <PaginationEllipsis />
          </PaginationItem>
        </div>
        <PaginationItem className="md:w-auto md:px-4">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
