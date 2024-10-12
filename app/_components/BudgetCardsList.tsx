import BudgetCard from "./BudgetCard";

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
export default function BudgetCardsList({ data }: { data: BudgetData }) {
  return (
    <div className="flex flex-col items-center justify-start gap-6 w-full">
      {data.map((budget) => (
        <BudgetCard
          color={budget.color}
          spent={budget.spent}
          title={budget.title}
          total={budget.total}
          spendingSummary={budget.spendingSummary}
          key={budget.title}
        />
      ))}
    </div>
  );
}
