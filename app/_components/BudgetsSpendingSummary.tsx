import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";
type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];
type BudgetData = {
  title: string;
  total: number;
  spent: number;
  color: string;
  spendingSummary: SpendingType;
}[];
export default function BudgetsSpendingSummary({ data }: { data: BudgetData }) {
  return (
    <div className="rounded-xl p-1 px-5 md:p-8 w-full h-auto bg-card-back-ground flex items-center justify-center flex-col md:flex-row xl:flex-col xl:max-w-[428px] ">
      <PieChartShad data={data} />
      <BudgetSpendingSummaryDetails data={data} />
    </div>
  );
}
