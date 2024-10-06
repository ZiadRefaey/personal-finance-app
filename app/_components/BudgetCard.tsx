import React from "react";
import Card from "./Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import BudgetSpendingSummary from "./BudgetSpendingSummary";
const dummyPopoverContent = (
  <div className="flex flex-col items-center justify-center gap-1">
    <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
      Click me
    </button>
  </div>
);
type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];
type BudgetCardType = {
  color: string;
  title: string;
  total: number;
  spent: number;
  spendingSummary: SpendingType;
};
export default function BudgetCard({
  color,
  title,
  total,
  spent,
  spendingSummary,
}: BudgetCardType) {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-4">
          <div className={`size-4 rounded-full bg-${color}`}></div>
          <p className="text-preset-2 text-primary">{title}</p>
        </div>
        <PopoverEllipsisTrigger content={dummyPopoverContent} />
      </div>
      <p className="text-preset-4 text-secondary mt-5 mb-4">
        Maximum of ${total.toFixed(2)}
      </p>
      <div className="p-1 bg-background rounded-sm mb-4">
        <Progress
          value={(spent / total) * 100}
          className="h-6 rounded-sm rounde "
          secondarycolor={color}
          progressClassName=" rounded-r-sm"
        />
      </div>
      <div className="flex items-center justify-center h-[43px] mb-5">
        <div className="w-full h-full flex items-center justify-start">
          <span className={`h-full w-1 rounded-md bg-${color} mr-4`}></span>
          <div className="flex flex-col items-start justify-between h-full">
            <p className="text-preset-5 text-secondary">Spent</p>
            <p className="text-preset-4-bold text-primary">
              ${spent.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-start h-full">
          <span className={`h-full w-1 rounded-md bg-background mr-4`}></span>
          <div className="flex flex-col items-start justify-between">
            <p className="text-preset-5 text-secondary">Remaining</p>
            <p className="text-preset-4-bold text-primary">
              ${(total - spent).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <BudgetSpendingSummary SpendingSummaryData={spendingSummary} />
    </Card>
  );
}
