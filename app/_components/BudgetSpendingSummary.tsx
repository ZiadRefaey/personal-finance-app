import React from "react";
import TransactionsTableSummary from "./TransactionsTableSummary";
import Papa from "@/public/avatars/bytewise.jpg";
import Quebec from "@/public/avatars/urban-services-hub.jpg";
import Romeo from "@/public/avatars/nimbus-data-storage.jpg";
type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];

const SpendingSummaryData: SpendingType = [
  {
    name: "Papa Software",
    image: Papa,
    amount: "10.00",
    date: "16 Aug 2024",
    deposite: false,
  },
  {
    name: "Quebec Services",
    image: Quebec,
    amount: "5.00",
    date: "12 Aug 2024",
    deposite: false,
  },
  {
    name: "Romeo Cloud Service",
    image: Romeo,
    amount: "10.00",
    date: "30 July 2024",
    deposite: false,
  },
];
export default function BudgetSpendingSummary() {
  return (
    <TransactionsTableSummary
      bg="secondary"
      transactions={SpendingSummaryData}
      title="Latest Spending"
    />
  );
}
