import React from "react";
import Card from "./UI/Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import DeleteForm from "./forms/DeleteForm";
import PotDepositeForm from "./forms/PotDepositeForm";
import PotWithdrawalForm from "./forms/PotWithdrawForm";
import { DeletePot, UpdatePot } from "../_lib/actions";
import PopoverButton from "./UI/PopoverButton";
import PotForm from "./forms/PotForm";
type PotType = {
  title: string;
  saved: number;
  goal: number;
  color: string;
  id: number;
};
export default function PotCard({ title, saved, goal, color, id }: PotType) {
  const editPotFormData = {
    title,
    goal,
    color,
  };
  const percentage = (saved / goal) * 100;
  return (
    <Card>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <div
            className={`size-4 rounded-full`}
            style={{ backgroundColor: `var(--${color})` }}
          ></div>
          <p className="text-preset-2 text-primary">{title}</p>
        </div>
        <PopoverEllipsisTrigger
          content={
            <div className="flex flex-col items-center justify-center gap-4">
              <PopoverButton>
                <Modal>
                  <ModalTrigger className="w-full" modalName="edit-pot">
                    Edit Pot
                  </ModalTrigger>
                  <ModalWindow
                    header="Edit Pot."
                    modalName="edit-pot"
                    description="Edit your pot to set savings targets. These can help keep you on track as you save for special purchases."
                  >
                    {/* <div></div> */}
                    <PotForm
                      successMessage="Pot updated successfully."
                      formData={editPotFormData}
                      action={UpdatePot}
                      id={id}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>
              <PopoverButton>
                <Modal>
                  <ModalTrigger className="hover:bg-red" modalName="delete-pot">
                    Delete Pot
                  </ModalTrigger>
                  <ModalWindow
                    header="Delete Pot?"
                    modalName="delete-pot"
                    description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
                  >
                    <DeleteForm
                      deleteMessage="Pot successfuly deleted."
                      action={DeletePot}
                      id={id}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>
            </div>
          }
        />
      </div>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-preset-4 text-secondary">Total Saved</p>
        <p className="text-preset-1 text-secondary self-start">
          $
          {saved.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <Progress
        value={percentage}
        className="h-2 z-10"
        indicatorClass={`relative z-10`}
        indicatorColor={color}
      />
      <div className="flex items-center justify-between mt-[13px]">
        <p className="text-preset-5-bold text-secondary">
          {percentage.toFixed(2)}%
        </p>
        <p className="text-preset-5 text-secondary">
          Target of ${goal.toLocaleString("en-US")}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 w-full gap-3">
        <Modal>
          <ModalTrigger primary={false} className="w-full" modalName="add-pot">
            + Add Money
          </ModalTrigger>
          <ModalWindow
            header="Add to Pot?"
            modalName="add-pot"
            description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
          >
            <PotDepositeForm currentSaved={saved} id={id} />
          </ModalWindow>
        </Modal>

        <Modal>
          <ModalTrigger
            primary={false}
            className="w-full"
            modalName="withdraw-pot"
          >
            Withdarw
          </ModalTrigger>
          <ModalWindow
            header="Withdraw from Pot?"
            modalName="withdraw-pot"
            description="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
          >
            <PotWithdrawalForm currentSaved={saved} id={id} />
          </ModalWindow>
        </Modal>
      </div>
    </Card>
  );
}
