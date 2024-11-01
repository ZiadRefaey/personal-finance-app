import React from "react";
import TransactionRow from "./TransactionRow";
import Card from "./Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import William from "@/public/avatars/william-harris.jpg";
import Serenity from "@/public/avatars/serenity-spa-and-wellness.jpg";
// type TransactionsType = {
//   name: string;
//   image: any;
//   amount: string;
//   date: string;
//   deposite: boolean;
// }[];
export default function TransactionsTableSummary({
  // transactions,
  bg,
  title,
}: {
  // transactions: TransactionsType;
  bg: "primary" | "secondary";
  title: string;
}) {
  const spendingSummary = [
    {
      name: "William Harris",
      image: William,
      amount: "10.00",
      date: "5 Aug 2024",
      deposite: false,
    },
    {
      name: "Serenity Spa & Wellness",
      image: Serenity,
      amount: "30.00",
      date: "3 Aug 2024",
      deposite: false,
    },
    {
      name: "Serenity Spa & Wellness",
      image: Serenity,
      amount: "30.00",
      date: "3 July 2024",
      deposite: false,
    },
  ];
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
        {spendingSummary.map((row) => (
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
