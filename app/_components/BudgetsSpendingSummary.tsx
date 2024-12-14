import { authenticateAndGetUserId, getBudgets } from "../_lib/data-service";
import { getBudgetsWithSpent } from "../_lib/helperFuncs";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

export default async function BudgetsSpendingSummary() {
  const userId = await authenticateAndGetUserId();
  const budgets = await getBudgets(userId);
  const data = await getBudgetsWithSpent(budgets);
  const totalSpent = data.reduce((acc, cur) => acc + cur.spent, 0);
  return (
    <div className="rounded-xl p-1 px-5 md:p-8 w-full h-auto bg-card-back-ground flex items-center justify-center flex-col md:flex-row xl:flex-col xl:max-w-[428px]">
      {/*if the total spent is 0 then the piechart wont display any value hence its better to show a placeholder */}
      {totalSpent == 0 ? (
        <div className="w-full items-center justify-center flex h-[290px] 2xl:h-[340px]">
          <p className="text-preset-2 text-primary">
            No transactions made yet.
          </p>
        </div>
      ) : (
        <PieChartShad data={data} />
      )}
      <BudgetSpendingSummaryDetails data={data} />
    </div>
  );
}
