import React from "react";
import Card from "./UI/Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import DeleteForm from "./forms/DeleteForm";
import { DeleteBudget, UpdateBudget } from "../_lib/actions";
import TransactionsTableSummary from "./TransactionsTableSummary";
import { getBudgetTransactions } from "../_lib/data-service";
import { auth } from "@/auth";
import PopoverButton from "./UI/PopoverButton";
import BudgetForm from "./forms/BudgetForm";
import { FormatNumber } from "../_lib/helperFuncs";

type BudgetCardType = {
  color: string;
  title: string;
  total: number;
  id: number;
};
export default async function BudgetCard({
  color,
  title,
  total,
  id,
}: BudgetCardType) {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const transactions = await getBudgetTransactions(userId, id);
  const spent = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  //data to be passed to update form as default values.
  const editBudgetFormData = {
    title,
    color,
    total,
  };

  //creating a shallow copy of transactions, sorting it then getting the latest 3 transactions for the summary
  const sortedTransactions = [...transactions]
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);
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
              <PopoverButton>
                <Modal>
                  <ModalTrigger modalName="edit-budget">
                    Edit Budget
                  </ModalTrigger>
                  <ModalWindow
                    header="Edit Budget"
                    modalName="edit-budget"
                    description="Edit your budget to choose a category to set a spending budget. These categories can help you monitor spending.."
                  >
                    <BudgetForm
                      action={UpdateBudget}
                      id={id}
                      successMessage="Budget successfully updated."
                      formData={editBudgetFormData}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>
              <PopoverButton>
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
              </PopoverButton>
            </>
          }
        />
      </div>
      <p className="text-preset-4 text-secondary mt-5 mb-4">
        Maximum of ${FormatNumber(total)}
      </p>
      <div className="p-1 bg-background rounded-sm mb-4">
        <Progress
          value={(spent / total) * 100}
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
              ${FormatNumber(spent)}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-start h-full">
          <span className={`h-full w-1 rounded-md bg-background mr-4`}></span>
          <div className="flex flex-col items-start justify-between">
            <p className="text-preset-5 text-secondary">Remaining</p>
            <p className="text-preset-4-bold text-primary">
              ${FormatNumber(total - spent)}
            </p>
          </div>
        </div>
      </div>
      <TransactionsTableSummary
        transactions={sortedTransactions}
        bg="secondary"
        title="Latest Spending"
      />
    </Card>
  );
}
