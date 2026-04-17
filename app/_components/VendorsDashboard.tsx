"use client";
import { useState } from "react";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import VendorsTable from "../_components/VendorsTable";
import { VendorsType } from "../_lib/types";
import VendorForm from "./forms/VendorForm";
import Card from "./UI/Card";
import EmptyState from "./EmptyState";
import { FaStore } from "react-icons/fa6";

export default function VendorsDashboard({
  vendors,
}: {
  vendors: VendorsType;
}) {
  const [data, setData] = useState<VendorsType>(vendors);

  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Vendors</h1>
        <Modal>
          <ModalTrigger modalName="add-vendor">+Add New Vendor</ModalTrigger>
          <ModalWindow
            header="Add New Vendor"
            modalName="add-vendor"
            description="Add a vendor where you make transactions with. These will show up to be picked from when creating a new transaction."
          >
            <VendorForm vendors={data} setVendors={setData} />
          </ModalWindow>
        </Modal>
      </div>
      <Card className="w-full bg-card-back-ground min-h-[86vh] flex items-center justify-between flex-col">
        {data.length === 0 ? (
          <EmptyState
            title="No vendors created yet"
            message="Add a vendor to start recording who you pay, bill, or receive money from."
            icon={<FaStore className="size-7" />}
            className="min-h-[64vh]"
          />
        ) : (
          <VendorsTable setData={setData} data={data} />
        )}
      </Card>
    </>
  );
}
