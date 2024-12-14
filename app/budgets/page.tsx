import React, { Suspense } from "react";
import BudgetCardsList from "../_components/BudgetCardsList";
import BudgetsSpendingSummary from "../_components/BudgetsSpendingSummary";

import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import BudgetForm from "../_components/forms/BudgetForm";
import { CreateBudget } from "../_lib/actions";
import { auth } from "@/auth";

import BudgetsSummarySkeleton from "../_components/UI/BudgetsSummarySkeleton";
import BudgetsCardsListSkeleton from "../_components/UI/BudgetsCardsListSkeleton";
import { getBudgets } from "../_lib/data-service";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const budgets = await getBudgets(userId);

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
      <div className="flex items-start justify-center flex-col xl:flex-row gap-6">
        {/* if there are no budgets created by the user yet, notify the user and hide budgets UI */}
        {budgets.length === 0 ? (
          <p className="text-preset-2 text-primary">No budgets created yet.</p>
        ) : (
          <>
            <Suspense fallback={<BudgetsSummarySkeleton />}>
              <BudgetsSpendingSummary />
            </Suspense>
            <Suspense fallback={<BudgetsCardsListSkeleton />}>
              <BudgetCardsList />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
}
