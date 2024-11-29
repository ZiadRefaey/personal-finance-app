"use client";
import { useState } from "react";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import VendorsTable from "../_components/VendorsTable";
import { VendorsType } from "../_lib/types";
import NewVendorForm from "./forms/NewVendorForm";
import Card from "./UI/Card";

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
          <ModalTrigger modalName="add-pot">+Add New Vendor</ModalTrigger>
          <ModalWindow
            header="Add New Pot"
            modalName="add-pot"
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          >
            <NewVendorForm />
          </ModalWindow>
        </Modal>
      </div>
      <Card className="w-full bg-card-back-ground min-h-[86vh] flex items-center justify-between flex-col">
        <VendorsTable setData={setData} data={data} />
      </Card>
    </>
  );
}
