import { authenticateAndGetUserId, getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

export default async function BudgetsSpendingSummary() {
  const userId = await authenticateAndGetUserId();
  const budgets = await getBudgets(userId);

  const data = await getBudgetsWithSpent(budgets);
  return (
    <div className="rounded-xl p-1 px-5 md:p-8 w-full h-auto bg-card-back-ground flex items-center justify-center flex-col md:flex-row xl:flex-col xl:max-w-[428px]">
      <PieChartShad data={data} />
      <BudgetSpendingSummaryDetails data={data} />
    </div>
  );
}
