import React from "react";
import Card from "./Card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <Card className="flex flex-col items-center justify-center w-full h-[700px] gap-10">
      <div className="w-full items-center justify-between flex">
        <Skeleton className="w-full max-w-[320px] h-[47px]" />
        <Skeleton className="w-[142px] h-10" />
      </div>
      <Skeleton className="w-full h-full" />
      <div className="w-full items-center justify-between flex">
        <Skeleton className="size-10 md:w-[83px] md:h-10"></Skeleton>
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
        <Skeleton className="size-10 md:w-[83px] md:h-10"></Skeleton>
      </div>
    </Card>
  );
}
