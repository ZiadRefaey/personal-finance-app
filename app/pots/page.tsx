import React from "react";

import PotCard from "../_components/PotCard";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import AddPotForm from "../_components/forms/PotForm";

const dummyPopoverContent = (
  <div className="flex flex-col items-center justify-center gap-1">
    <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
      Click me
    </button>
  </div>
);
const Pots = [
  {
    title: "Savings",
    saved: "159.00",
    percentage: 7.95,
    target: 2000,
    color: "bg-green",
    PopoverContent: dummyPopoverContent,
  },
  {
    title: "Concert Ticket",
    saved: "110.00",
    percentage: 73.3,
    target: 150,
    color: "bg-navy",
    PopoverContent: dummyPopoverContent,
  },
  {
    title: "Gift",
    saved: "40.00",
    percentage: 66.6,
    target: 60,
    color: "bg-cyan",
    PopoverContent: dummyPopoverContent,
  },
  {
    title: "New Laptop",
    saved: "10.00",
    percentage: 7.95,
    target: 1000,
    color: "bg-yellow",
    PopoverContent: dummyPopoverContent,
  },
];
export default function page() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Pots</h1>
        <Modal>
          <ModalTrigger modalName="add-pot">+Add New Pot</ModalTrigger>
          <ModalWindow
            header="Add New Pot"
            modalName="add-pot"
            form={<AddPotForm />}
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          />
        </Modal>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Pots.map((pot) => (
          <PotCard
            color={pot.color}
            percentage={pot.percentage}
            popoverContent={pot.PopoverContent}
            saved={pot.saved}
            target={pot.target}
            title={pot.title}
            key={pot.title}
          />
        ))}
      </div>
    </>
  );
}
