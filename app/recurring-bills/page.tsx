import React from "react";
import TotalBillsCard from "../_components/TotalBillsCard";
import BillsSummaryCard from "../_components/BillsSummaryCard";
import Card from "../_components/UI/Card";
import BillsTable from "../_components/BillsTable";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import NewVendorForm from "../_components/forms/NewVendorForm";
import { getBills, getVendors } from "../_lib/data-service";
import { auth } from "@/auth";
import BillForm from "../_components/forms/BillForm";
import BillsDashboard from "../_components/BillsDashboard";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const bills = await getBills(userId);
  const billsTableData = bills.map((bill) => ({
    id: bill.id,
    image: bill.vendors.image,
    title: bill.vendors.name,
    amount: bill.amount,
    status: bill.status,
    date: bill.due_date,
    pay_day: bill.pay_day,
  }));
  const totalBills = bills.reduce((acc, cur) => cur.amount + acc, 0);
  const vendors = await getVendors(userId);
  const vendorNames = vendors.map((vendor) => vendor.name);

  return (
    <BillsDashboard
      totalBills={totalBills}
      vendorNames={vendorNames}
      billsTableData={billsTableData}
    />
  );
}
