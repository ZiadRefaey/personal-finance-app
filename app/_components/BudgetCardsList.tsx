import { BudgetType } from "../_lib/types";
import BudgetCard from "./BudgetCard";

export default async function BudgetCardsList({
  data,
}: {
  data: BudgetType[];
}) {
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
