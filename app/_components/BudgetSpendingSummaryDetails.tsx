import React from "react";
type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];
type BudgetData = {
  title: string;
  total: number;
  spent: number;
  color: string;
  spendingSummary: SpendingType;
}[];
export default function BudgetSpendingSummaryDetails({
  data,
}: {
  data: BudgetData;
}) {
  return (
    <div className="flex items-center justify-center flex-col divide-y-[1px] divide-seperator w-full md:w-[50%] xl:w-full">
      {data.map((budget) => (
        <SpendingRow
          color={budget.color}
          title={budget.title}
          spent={budget.spent}
          total={budget.total}
          key={budget.title}
        />
      ))}
    </div>
  );
}
function SpendingRow({
  color,
  title,
  spent,
  total,
}: {
  color: string;
  title: string;
  spent: number;
  total: number;
}) {
  return (
    <div className="py-4 flex items-center justify-between w-full">
      <div className="flex items-center justify-center">
        <div className={`h-[21px] w-1 bg-${color} mr-4`}></div>
        <p className="text-preset-4 text-secondary">{title}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-preset-3 text-primary">${spent.toFixed(2)}</p>
        <p className="text-preset-5 text-secondary">
          &nbsp;of ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
