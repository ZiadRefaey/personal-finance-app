import React from "react";
import Card from "./Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import DeleteForm from "./forms/DeleteForm";
import PotDepositeForm from "./forms/PotDepositeForm";
import PotWithdrawalForm from "./forms/PotWithdrawForm";
type PotType = {
  title: string;
  saved: string;
  percentage: number;
  target: number;
  color: string;
};
export default function PotCard({
  title,
  saved,
  percentage,
  target,
  color,
}: PotType) {
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
            <Modal>
              <ModalTrigger modalName="delete-pot">Delete Pot</ModalTrigger>
              <ModalWindow
                header="Delete Pot?"
                modalName="delete-pot"
                description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
              >
                <DeleteForm />
              </ModalWindow>
            </Modal>
          }
        />
      </div>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-preset-4 text-secondary">Total Saved</p>
        <p className="text-preset-1 text-secondary self-start">${saved}</p>
      </div>
      <Progress
        value={percentage}
        className="h-2 z-10"
        indicatorClass={`relative z-10`}
        indicatorColor={color}
      />
      <div className="flex items-center justify-between mt-[13px]">
        <p className="text-preset-5-bold text-secondary">{percentage}%</p>
        <p className="text-preset-5 text-secondary">Target of ${target}</p>
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
            <PotDepositeForm />
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
            <PotWithdrawalForm />
          </ModalWindow>
        </Modal>
      </div>
    </Card>
  );
}
