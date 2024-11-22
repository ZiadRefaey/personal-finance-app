import React, { Suspense } from "react";

import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import PotForm from "../_components/forms/PotForm";
import { CreatePot } from "../_lib/actions";
import { auth } from "@/auth";
import PotsCardsList from "../_components/PotsCardsList";
import PotCardsListSkeleton from "../_components/UI/PotCardsListSkeleton";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

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
            <PotForm
              successMessage="Pot created successfully."
              id={userId}
              action={CreatePot}
            />
          </ModalWindow>
        </Modal>
      </div>
      <Suspense fallback={<PotCardsListSkeleton />}>
        <PotsCardsList />
      </Suspense>
    </>
  );
}
