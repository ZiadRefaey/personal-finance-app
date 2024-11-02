import BudgetCard from "./BudgetCard";

// type SpendingType = {
//   name: string;
//   image: any;
//   amount: string;
//   date: string;
//   deposite: false;
// }[];
type BudgetDataType = {
  id: number;
  created_at: Date;
  userID: number;
  name: string;
  maximum: number;
  color: string;
}[];
export default async function BudgetCardsList({
  data,
}: {
  data: BudgetDataType;
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
