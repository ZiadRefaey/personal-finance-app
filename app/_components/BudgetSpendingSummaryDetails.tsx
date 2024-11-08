import React from "react";
import { FormatNumber } from "../_lib/helperFuncs";
type BudgetDataType = {
  id: number;
  created_at: string;
  userId: number;
  name: string;
  color: string;
  maximum: number;
  spent: number;
}[];
export default function BudgetSpendingSummaryDetails({
  data,
}: {
  data: BudgetDataType;
}) {
  return (
    <div className="flex items-center justify-center flex-col divide-y-[1px] divide-seperator w-full md:w-[50%] xl:w-full">
      {data.map((budget) => (
        <SpendingRow
          color={budget.color}
          title={budget.name}
          total={budget.maximum}
          spent={budget.spent}
          key={budget.id}
        />
      ))}
    </div>
  );
}
function SpendingRow({
  color,
  title,
  total,
  spent,
}: {
  color: string;
  title: string;
  total: number;
  spent: number;
}) {
  return (
    <div className="py-4 flex items-center justify-between w-full">
      <div className="flex items-center justify-center">
        <div
          className={`h-[21px] w-1 mr-4`}
          style={{ backgroundColor: `var(--${color})` }}
        ></div>
        <p className="text-preset-4 text-secondary">{title}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-preset-3 text-primary">${FormatNumber(spent)}</p>
        <p className="text-preset-5 text-secondary">
          &nbsp;of ${total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
