import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

type BudgetDataType = {
  id: number;
  created_at: string;
  userId: number;
  name: string;
  color: string;
  maximum: number;
  spent: number;
}[];
export default async function BudgetsSpendingSummary({
  data,
}: {
  data: BudgetDataType;
}) {
  return (
    <div className="rounded-xl p-1 px-5 md:p-8 w-full h-auto bg-card-back-ground flex items-center justify-center flex-col md:flex-row xl:flex-col xl:max-w-[428px] ">
      <PieChartShad data={data} />
      <BudgetSpendingSummaryDetails data={data} />
    </div>
  );
}
