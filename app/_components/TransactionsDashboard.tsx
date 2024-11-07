"use client";
import React, { useState } from "react";
import Card from "../_components/UI/Card";
import NewVendorForm from "../_components/forms/NewVendorForm";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import TransactionTable from "../_components/TransactionTable";
import TransactionForm from "../_components/forms/TransactionForm";

type TransactionSupabase = {
  id: number;
  created_at: string;
  amount: number;
  userId: number;
  budgetId: number;
  vendorId: number;
  vendors: { name: string; image: string };
  budgets: { name: string };
};
type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  deposite: boolean;
};

export default function TransactionsDashboard({
  categories,
  vendorsNames,
  transactions,
}: any) {
  const tableData = transactions.map((transaction: TransactionSupabase) => ({
    avatar: transaction.vendors.image,
    name: transaction.vendors.name,
    category: transaction.budgets.name,
    date: new Date(transaction.created_at),
    amount: transaction.amount,
    deposite: false,
  }));
  const [data, setData] = useState<Transaction[]>(tableData);
  return (
    <>
      <div className="w-full flex flex-col items-start justify-center md:flex-row md:justify-between gap-10 mb-[42px]">
        <h1 className="text-preset-2 md:text-preset-1 text-primary">
          Transactions
        </h1>
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
            <ModalTrigger modalName="add-transaction">
              Make Transaction
            </ModalTrigger>
            <ModalWindow
              header="Make New Transaction"
              modalName="add-transaction"
              description="Create a transaction to set showcase your spendings. These can help keep you on track the money you are spending on a daily basis."
            >
              <TransactionForm
                categories={categories}
                vendorsNames={vendorsNames}
                setTransactionData={setData}
              />
            </ModalWindow>
          </Modal>
        </div>
      </div>
      <Card className="w-full bg-card-back-ground min-h-[86vh] flex items-center justify-between flex-col">
        <TransactionTable data={data} />
      </Card>
    </>
  );
}