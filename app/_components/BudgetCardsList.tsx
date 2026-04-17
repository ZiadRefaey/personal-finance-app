import { authenticateAndGetUserId, getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";
import { BudgetType } from "../_lib/types";
import BudgetCard from "./BudgetCard";
import EmptyState from "./EmptyState";
import { BiSolidPieChartAlt2 } from "react-icons/bi";

export default async function BudgetCardsList() {
  const userId = await authenticateAndGetUserId();
  const budgets = await getBudgets(userId);

  const data: BudgetType[] = await getBudgetsWithSpent(budgets);
  if (budgets.length === 0) {
    return (
      <EmptyState
        title="No budgets created yet"
        message="Add a budget to set spending limits and start tracking where your money is going."
        icon={<BiSolidPieChartAlt2 className="size-7" />}
      />
    );
  } else
    return (
      <div className="flex flex-col items-center justify-start gap-6 w-full">
        {data.map((budget) => (
          <BudgetCard
            color={budget.color}
            title={budget.name}
            total={budget.maximum}
            id={budget.id}
            key={budget.id}
          />
        ))}
      </div>
    );
}
