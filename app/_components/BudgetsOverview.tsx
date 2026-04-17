import React from "react";
import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

import { auth } from "@/auth";
import { getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";
import EmptyState from "./EmptyState";
import { BiSolidPieChartAlt2 } from "react-icons/bi";

export default async function BudgetsOverview() {
  const session = await auth();
  const budgets = await getBudgets(Number(session?.user?.id));
  const budgetsWithSpent = await getBudgetsWithSpent(budgets);
  const totalSpent = budgetsWithSpent.reduce((acc, cur) => acc + cur.spent, 0);

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
        <EmptyState
          title="No budgets created yet"
          message="Add a budget to start tracking spending by category."
          icon={<BiSolidPieChartAlt2 className="size-7" />}
          className="min-h-[240px]"
        />
      )}
      {budgetsWithSpent.length > 0 && (
        <div className="flex items-center justify-center flex-col">
          {totalSpent == 0 ? (
            <EmptyState
              title="No spending tracked yet"
              message="Make a transaction to see your budget chart come to life."
              icon={<BiSolidPieChartAlt2 className="size-7" />}
              className="min-h-[290px] 2xl:min-h-[340px]"
            />
          ) : (
            <PieChartShad data={displayedBudgets} />
          )}
          <BudgetSpendingSummaryDetails data={displayedBudgets} />
        </div>
      )}
    </Card>
  );
}
