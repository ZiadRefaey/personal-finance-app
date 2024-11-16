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
  }));
  const totalBills = bills.reduce((acc, cur) => cur.amount + acc, 0);
  const vendors = await getVendors(userId);
  const vendorsNames = vendors.map((vendor) => vendor.name);

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
              <BillForm vendorsNames={vendorsNames} />
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
          <BillsTable tableData={billsTableData} />
        </Card>
      </div>
    </>
  );
}
