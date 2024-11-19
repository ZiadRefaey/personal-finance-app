"use client";
import React, { useState } from "react";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import NewVendorForm from "./forms/NewVendorForm";
import BillForm from "./forms/BillForm";
import TotalBillsCard from "./TotalBillsCard";
import BillsSummaryCard from "./BillsSummaryCard";
import BillsTable from "./BillsTable";
import { Bills } from "@/app/_lib/types";
import Card from "./UI/Card";
export default function BillsDashboard({
  billsTableData,
  totalBills,
  vendorNames,
}: {
  billsTableData: Bills[];
  totalBills: number;
  vendorNames: string[];
}) {
  const [data, setData] = useState<Bills[]>(billsTableData);

  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Recurring Bills</h1>
        <div className="flex items-center justify-center self-end gap-4">
          <Modal>
            <ModalTrigger modalName="add-vendor">+Add New Vendor</ModalTrigger>
            <ModalWindow
              header="Add New Vendor"
              modalName="add-vendor"
              description="Add a vendor where you make transactions with. These will show up to be picked from when creating a new transaction"
            >
              <NewVendorForm />
            </ModalWindow>
          </Modal>

          <Modal>
            <ModalTrigger modalName="add-bill">Add Bill</ModalTrigger>
            <ModalWindow
              header="Add a new bill"
              modalName="add-bill"
              description="Add a new bill track your payments monthly. These will be available to pay and subtracted from your balance on the set date"
            >
              <BillForm setBillsTableData={setData} vendorNames={vendorNames} />
            </ModalWindow>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[337px,1fr] gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 xl:grid-cols-1 self-start">
          <TotalBillsCard total={totalBills} />
          <BillsSummaryCard />
        </div>
        <Card>
          <BillsTable setData={setData} vendorNames={vendorNames} data={data} />
        </Card>
      </div>
    </>
  );
}
