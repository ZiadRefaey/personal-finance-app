import React from "react";

export default function SummaryRow({
  due = false,
  numberOfBills,
  BillsAmount,
  title,
  className,
}: {
  className: string;
  due?: boolean;
  title: string;
  numberOfBills: number;
  BillsAmount: number;
}) {
  return (
    <div className={`${className} flex items-center justify-between w-full`}>
      <p className={`${due ? "text-red" : "text-secondary"} text-preset-5`}>
        {title}
      </p>
      <span
        className={`${due ? "text-red" : "text-primary"} text-preset-5-bold`}
      >
        {numberOfBills} (${BillsAmount.toFixed(2)})
      </span>
    </div>
  );
}
