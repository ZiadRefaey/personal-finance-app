import React from "react";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

import { auth } from "@/auth";
import { getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";

export default async function BudgetsOverview() {
  const session = await auth();
  const budgets = await getBudgets(Number(session?.user?.id));
  const budgetsWithSpent = await getBudgetsWithSpent(budgets);
  //descending sorting based on budget spent. then displaying the top 4
  const displayedBudgets = budgetsWithSpent
    .toSorted((a, b) => b.spent - a.spent)
    .slice(0, 4);
  return (
    <Card>
      <OverviewSectionHeader
        title="Budgets"
        buttonContent="See Details"
        href="/budgets"
      />
      {budgetsWithSpent.length === 0 && (
        <div className="w-full items-center justify-center">
          <p className="text-center text-primary text-preset-2">
            No budgets created yet.
          </p>
        </div>
      )}
      {budgetsWithSpent.length > 0 && (
        <div className="flex items-center justify-center flex-col">
          <PieChartShad data={displayedBudgets} />
          <BudgetSpendingSummaryDetails data={displayedBudgets} />
        </div>
      )}
    </Card>
  );
}
