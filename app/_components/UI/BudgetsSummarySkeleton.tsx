import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetsSummarySkeleton() {
  return (
    <div className="rounded-xl p-1 px-5 md:p-8 w-full h-auto bg-card-back-ground flex items-center justify-center flex-col md:flex-row xl:flex-col xl:max-w-[428px] gap-4 xl:gap-0">
      <Skeleton className="size-[224px] xl:size-[264px] rounded-full"></Skeleton>
      <div className="flex items-center justify-center flex-col divide-y-[1px] divide-seperator w-full md:w-[50%] xl:w-full">
        <div className="py-4 flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <Skeleton className={`h-[21px] w-1 mr-4`} />
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-[120px] h-6" />
          </div>
        </div>
        <div className="py-4 flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <Skeleton className={`h-[21px] w-1 mr-4`} />
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-[120px] h-6" />
          </div>
        </div>
        <div className="py-4 flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <Skeleton className={`h-[21px] w-1 mr-4`} />
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-[120px] h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
