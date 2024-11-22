import React from "react";
import Card from "./Card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PotCardsListSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <PotCardSkeleton />
      <PotCardSkeleton />
      <PotCardSkeleton />
      <PotCardSkeleton />
    </div>
  );
}
function PotCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-4">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="w-4 h-2" />
      </div>
      <div className="flex items-center justify-between mt-8 mb-4">
        <Skeleton className="w-[75px] h-[21px]" />
        <Skeleton className="w-[125px] h-[35px]" />
      </div>
      <Skeleton className="w-full h-2" />

      <div className="flex items-center justify-between mt-[13px]">
        <Skeleton className="w-[35px] h-[18px]" />

        <Skeleton className="w-[115px] h-[18px]" />
      </div>
      <div className="mt-8 grid grid-cols-2 w-full gap-3">
        <Skeleton className="w-full h-[55px]" />
        <Skeleton className="w-full h-[55px]" />
      </div>
    </Card>
  );
}
