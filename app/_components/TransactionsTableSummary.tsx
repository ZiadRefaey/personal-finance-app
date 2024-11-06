import React from "react";
import TransactionRow from "./TransactionRow";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";

type TransactionsType = {
  amount: number;
  created_at: string;
  vendors: { name: string; image: string };
}[];
export default function TransactionsTableSummary({
  transactions,
  bg,
  title,
}: {
  transactions?: any;
  bg: "primary" | "secondary";
  title: string;
}) {
  return (
    <Card bg={`${bg}`}>
      <OverviewSectionHeader
        title={title}
        popoverTitle="View All"
        // Dummy Popover content
        popoverContent={
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
              Click me
            </button>
          </div>
        }
      />
      {transactions?.length === 0 && (
        <div className="w-full flex items-center justify-center p-10">
          <p className="text-primary text-preset-2">
            Please make a transaction
          </p>
        </div>
      )}
      {transactions?.length > 0 && (
        <div className="flex flex-col divide-y-[1px] -my-6 divide-seperator">
          {transactions?.map((transaction: any, index: number) => (
            <TransactionRow
              amount={transaction.amount}
              date={transaction.created_at}
              deposite={false}
              image={transaction.vendors.image}
              name={transaction.vendors.name}
              key={index}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
