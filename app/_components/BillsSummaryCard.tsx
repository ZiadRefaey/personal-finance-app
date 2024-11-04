import React from "react";
import Card from "./UI/Card";

export default function BillsSummaryCard() {
  return (
    <Card className="p-5 bg-card-back-ground">
      <h3 className="text-primary text-preset-3 mb-5">Summary</h3>
      <div className="divide-y divide-seperator flex flex-col">
        <SummaryRow
          className="pb-4"
          BillsAmount={320}
          numberOfBills={2}
          title="Paid Bills"
        />
        <SummaryRow
          className="py-4"
          BillsAmount={1230}
          numberOfBills={6}
          title="Total Upcoming"
        />
        <SummaryRow
          className="pt-4"
          BillsAmount={320}
          numberOfBills={2}
          title="Paid Bills"
          due={true}
        />
      </div>
    </Card>
  );
}
function SummaryRow({
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
