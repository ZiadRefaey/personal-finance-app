import React from "react";
import TransactionRow from "./TransactionRow";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import EmptyState from "./EmptyState";
import { LuArrowUpDown } from "react-icons/lu";

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
        <EmptyState
          title="No transactions yet"
          message="Make a transaction to start seeing recent activity here."
          icon={<LuArrowUpDown className="size-7" />}
          className="min-h-[180px]"
        />
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
