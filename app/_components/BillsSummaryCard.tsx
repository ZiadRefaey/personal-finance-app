import React from "react";
import Card from "./UI/Card";
import { authenticateAndGetUserId, getBills } from "../_lib/data-service";
import { BillType } from "../_lib/types";
import SummaryRow from "./SummaryRow";

export default async function BillsSummaryCard() {
  const userId = await authenticateAndGetUserId();
  const bills: BillType[] = await getBills(userId);
  // console.log(bills);
  const NumberOfPaid = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "paid") return acc + 1;
    return acc;
  }, 0);
  const totalPaid = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "paid") return acc + Number(cur.amount);
    return acc;
  }, 0);
  const NumberOfUpcoming = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "upcoming") return acc + 1;
    return acc;
  }, 0);
  const totalUpcoming = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "upcoming") return acc + Number(cur.amount);
    return acc;
  }, 0);
  const NumberOfOverDue = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "over due") return acc + 1;
    return acc;
  }, 0);
  const totalOverDue = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "over due") return acc + Number(cur.amount);
    return acc;
  }, 0);
  return (
    <Card className="p-5 bg-card-back-ground">
      <h3 className="text-primary text-preset-3 mb-5">Summary</h3>
      <div className="divide-y divide-seperator flex flex-col">
        <SummaryRow
          className="pb-4"
          BillsAmount={totalPaid}
          numberOfBills={NumberOfPaid}
          title="Paid Bills"
        />
        <SummaryRow
          className="py-4"
          BillsAmount={totalUpcoming}
          numberOfBills={NumberOfUpcoming}
          title="Total Upcoming"
        />
        <SummaryRow
          className="pt-4"
          BillsAmount={totalOverDue}
          numberOfBills={NumberOfOverDue}
          title="Over Due Bills"
          due={true}
        />
      </div>
    </Card>
  );
}
