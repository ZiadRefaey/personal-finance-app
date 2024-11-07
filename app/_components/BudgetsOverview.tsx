import React from "react";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

import { auth } from "@/auth";
import { readBudgets } from "../_lib/data-service";

export default async function BudgetsOverview() {
  const session = await auth();
  const budgets = await readBudgets(Number(session?.user?.id));
  return (
    <Card>
      <OverviewSectionHeader
        title="Budgets"
        popoverTitle="See Details"
        popoverContent={
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
              Click me
            </button>
          </div>
        }
      />
      {budgets.length === 0 && (
        <div className="w-full items-center justify-center">
          <p className="text-center text-primary text-preset-2">
            No budgets created yet.
          </p>
        </div>
      )}
      {budgets.length > 0 && (
        <div className="flex items-center justify-center flex-col">
          <PieChartShad data={budgets} />
          <BudgetSpendingSummaryDetails data={budgets} />
        </div>
      )}
    </Card>
  );
}
