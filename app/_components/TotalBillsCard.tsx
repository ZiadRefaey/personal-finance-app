import React from "react";
import Card from "./Card";
import { PiReceiptFill } from "react-icons/pi";

export default function TotalBillsCard() {
  return (
    <Card className="px-6 py-5 bg-primary flex items-center justify-start gap-5 md:flex-col md:items-start md:justify-between">
      <PiReceiptFill className="size-10 text-card-back-ground" />
      <div className="text-card-back-ground flex flex-col items-start justify-center gap-3 ">
        <h2 className="text-preset-4">Total bills</h2>
        <span className="text-preset-1">$384.98</span>
      </div>
    </Card>
  );
}
