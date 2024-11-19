import React from "react";
import TransactionRow from "./TransactionRow";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";

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
        buttonContent="View All"
        href="/transactions"
      />
      {transactions?.length === 0 && (
        <div className="w-full flex items-center justify-center p-10">
          <p className="text-primary text-preset-2">
            No transactions made yet.
          </p>
        </div>
      )}
      {transactions?.length > 0 && (
        <div className="flex flex-col divide-y-[1px] -my-6 divide-seperator">
          {transactions?.map((transaction: any, index: number) => (
            <TransactionRow
              amount={transaction.amount}
              date={transaction.created_at}
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
