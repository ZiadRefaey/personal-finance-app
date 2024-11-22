import React from "react";
import TableSkeleton from "../_components/UI/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Skeleton className="self-start h-10 w-[190px]" />
        <div className="flex items-center justify-center gap-3 self-end">
          <Skeleton className="h-[54px] w-[143px]" />
          <Skeleton className="h-[54px] w-[143px]" />
        </div>
      </div>
      <TableSkeleton />
    </>
  );
}
