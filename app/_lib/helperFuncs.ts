import { getTransactionsByBudgetId } from "./data-service";
import { BudgetAPIType } from "./types";

export function FormatNumber(number: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
export function getDaysUntil(date: string | number | Date): number {
  const today: any = new Date();
  const dueDate: any = new Date(date);
  const timeDiff = dueDate - today;
  const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysUntil;
}
export async function getBudgetsWithSpent(budgets: BudgetAPIType[]) {
  const budgetsWithSpent = await Promise.all(
    budgets.map(async (budget) => {
      const transactions = await getTransactionsByBudgetId(budget.id);
      const totalTransactions = transactions.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      return {
        ...budget, // spread the existing properties
        spent: totalTransactions, // add the new total property
      };
    })
  );
  return budgetsWithSpent;
}
