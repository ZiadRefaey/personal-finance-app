import React from "react";
import Card from "./UI/Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import BudgetSpendingSummary from "./BudgetSpendingSummary";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import DeleteForm from "./forms/DeleteForm";
import { DeleteBudget } from "../_lib/actions";

// type SpendingType = {
//   name: string;
//   image: any;
//   amount: string;
//   date: string;
//   deposite: false;
// }[];
type BudgetCardType = {
  color: string;
  title: string;
  total: number;
  id: number;
  // spendingSummary: SpendingType;
};
export default function BudgetCard({
  color,
  title,
  total,
  id,
}: // spendingSummary,

BudgetCardType) {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-4">
          <div
            className={`size-4 rounded-full`}
            style={{ backgroundColor: `var(--${color})` }}
          ></div>
          <p className="text-preset-2 text-primary">{title}</p>
        </div>
        <PopoverEllipsisTrigger
          content={
            <>
              <Modal>
                <ModalTrigger modalName="delete-budget">
                  Delete Budget
                </ModalTrigger>
                <ModalWindow
                  header="Delete Budget?"
                  modalName="delete-budget"
                  description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
                >
                  <DeleteForm
                    deleteMessage="Budget successfuly deleted."
                    id={id}
                    action={DeleteBudget}
                  />
                </ModalWindow>
              </Modal>
            </>
          }
        />
      </div>
      <p className="text-preset-4 text-secondary mt-5 mb-4">
        Maximum of ${total.toFixed(2)}
      </p>
      <div className="p-1 bg-background rounded-sm mb-4">
        <Progress
          value={(40 / 100) * 100}
          indicatorColor={color}
          className="h-6 rounded-sm"
          indicatorClass={`rounded-r-sm`}
        />
      </div>
      <div className="flex items-center justify-center h-[43px] mb-5">
        <div className="w-full h-full flex items-center justify-start">
          <span
            className={`h-full w-1  rounded-md mr-4`}
            style={{ backgroundColor: `var(--${color})` }}
          ></span>
          <div className="flex flex-col items-start justify-between h-full">
            <p className="text-preset-5 text-secondary">Spent</p>
            <p className="text-preset-4-bold text-primary">
              {/* ${spent.toFixed(2)} */}
              $0.00
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-start h-full">
          <span className={`h-full w-1 rounded-md bg-background mr-4`}></span>
          <div className="flex flex-col items-start justify-between">
            <p className="text-preset-5 text-secondary">Remaining</p>
            <p className="text-preset-4-bold text-primary">
              {/* total - spent */}${(total - 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {/* <BudgetSpendingSummary SpendingSummaryData={spendingSummary} /> */}
      <BudgetSpendingSummary />
    </Card>
  );
}
