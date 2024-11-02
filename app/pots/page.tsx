import React from "react";

import PotCard from "../_components/PotCard";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import PotForm from "../_components/forms/PotForm";
import { CreatePot } from "../_lib/actions";
import { auth } from "@/auth";
import { readPots } from "../_lib/data-service";

export default async function page() {
  const session = await auth();
  const userID = Number(session?.user?.id);
  const pots = await readPots(userID);
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Pots</h1>
        <Modal>
          <ModalTrigger modalName="add-pot">+Add New Pot</ModalTrigger>
          <ModalWindow
            header="Add New Pot"
            modalName="add-pot"
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          >
            <PotForm userID={userID} action={CreatePot} />
          </ModalWindow>
        </Modal>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {pots.map((pot) => (
          <PotCard
            id={pot.id}
            color={pot.color}
            saved={pot.saved}
            goal={pot.goal}
            title={pot.title}
            key={pot.title}
          />
        ))}
      </div>
    </>
  );
}
