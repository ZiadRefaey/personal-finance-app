import React from "react";
import Card from "./UI/Card";
import { authenticateAndGetUserId, getBills } from "../_lib/data-service";
import { BillType } from "../_lib/types";
import SummaryRow from "./SummaryRow";
import { getBillsSummaryDetails } from "../_lib/helperFuncs";

export default async function BillsSummaryCard() {
  const userId = await authenticateAndGetUserId();
  const bills: BillType[] = await getBills(userId);
  const {
    totalPaid,
    NumberOfPaid,
    totalUpcoming,
    NumberOfUpcoming,
    totalOverDue,
    NumberOfOverDue,
  } = getBillsSummaryDetails(bills);
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
