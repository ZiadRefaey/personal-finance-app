import React from "react";
import Card from "./Card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetsCardsListSkeleton() {
  return (
    <div className="flex flex-col items-center justify-start gap-6 w-full">
      <BudgetSkeletonCard />
      <BudgetSkeletonCard />
      <BudgetSkeletonCard />
    </div>
  );
}
function BudgetSkeletonCard() {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-4">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="w-4 h-2" />
      </div>
      <Skeleton className="w-[120px] h-4  mt-5 mb-4" />

      <Skeleton className="w-full h-6 rounded-sm mb-4" />

      <div className="flex items-center justify-center h-[43px] mb-5">
        <div className="w-full h-full flex items-center justify-start">
          <Skeleton className="h-full w-1 mr-4" />
          <div className="flex flex-col items-start justify-between h-full">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>

        <div className="w-full flex items-center justify-start h-full">
          <Skeleton className="h-full w-1 mr-4" />
          <div className="flex flex-col items-start justify-between h-full">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-[150px]" />
    </Card>
  );
}
