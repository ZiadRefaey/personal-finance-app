import React from "react";
import TransactionRow from "./TransactionRow";
import Card from "./Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
type TransactionsType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: boolean;
}[];
export default function TransactionsTableSummary({
  transactions,
  bg,
  title,
}: {
  transactions: TransactionsType;
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

      <div className="flex flex-col divide-y-[1px] -my-6 divide-seperator">
        {/* Dummy Transactions Data */}
        {transactions.map((row) => (
          <TransactionRow
            amount={row.amount}
            date={row.date}
            deposite={row.deposite}
            image={row.image}
            name={row.name}
            key={row.name}
          />
        ))}
      </div>
    </Card>
  );
}
