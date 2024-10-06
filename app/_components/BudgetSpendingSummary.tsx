import React from "react";
import TransactionsTableSummary from "./TransactionsTableSummary";

type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];

export default function BudgetSpendingSummary({
  SpendingSummaryData,
}: {
  SpendingSummaryData: SpendingType;
}) {
  return (
    <TransactionsTableSummary
      bg="secondary"
      transactions={SpendingSummaryData}
      title="Latest Spending"
    />
  );
}
