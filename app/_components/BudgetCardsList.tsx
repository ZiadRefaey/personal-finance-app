import { authenticateAndGetUserId, getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";
import { BudgetType } from "../_lib/types";
import BudgetCard from "./BudgetCard";

export default async function BudgetCardsList() {
  const userId = await authenticateAndGetUserId();
  const budgets = await getBudgets(userId);

  const data: BudgetType[] = await getBudgetsWithSpent(budgets);
  if ((budgets.length = 0)) {
    return (
      <div className="w-full items-center justify-center">
        <p className="text-center text-primary text-preset-2">
          No budgets created yet.
        </p>
      </div>
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
