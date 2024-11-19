import React from "react";
import BudgetCardsList from "../_components/BudgetCardsList";
import BudgetsSpendingSummary from "../_components/BudgetsSpendingSummary";

import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import BudgetForm from "../_components/forms/BudgetForm";
import { CreateBudget } from "../_lib/actions";
import { auth } from "@/auth";
import { getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";

export const revalidate = 0;
export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const budgets = await getBudgets(userId);

  const budgetsWithSpent = await getBudgetsWithSpent(budgets);
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Budgets</h1>
        <Modal>
          <ModalTrigger modalName="add-budget">+Add Budget</ModalTrigger>
          <ModalWindow
            header="Add New Budget"
            modalName="add-budget"
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
          >
            <BudgetForm
              id={userId}
              action={CreateBudget}
              successMessage="Budget successfully created."
            />
          </ModalWindow>
        </Modal>
      </div>
      {budgetsWithSpent.length === 0 && (
        <div className="w-full items-center justify-center">
          <p className="text-center text-primary text-preset-2">
            Please Create a new budget
          </p>
        </div>
      )}
      {budgetsWithSpent.length > 0 && (
        <div className="flex items-start justify-center flex-col xl:flex-row gap-6">
          <BudgetsSpendingSummary data={budgetsWithSpent} />
          <BudgetCardsList data={budgetsWithSpent} />
        </div>
      )}
    </>
  );
}
