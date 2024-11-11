import { getTransactions } from "../_lib/data-service";
import { FormatNumber } from "../_lib/helperFuncs";

interface CardType {
  featuredCard: boolean;
  title: string;
  amount: number;
}

function Card({ featuredCard, title, amount }: CardType) {
  return (
    <div
      className={`p-4 md:p-6 ${
        featuredCard
          ? "bg-highlighted-card text-white"
          : "bg-card-back-ground text-primary"
      } rounded-xl`}
    >
      <p className={`text-preset-4`}>{title}</p>
      <p className={`text-preset-1`}>${FormatNumber(amount)}</p>
    </div>
  );
}
export default async function OverviewStatsCardsList({
  userData,
}: {
  userData: any;
}) {
  const transactions = await getTransactions(userData.id);
  const expenses = transactions.reduce((acc, cur) => acc + cur.amount, 0);
  const stats = [
    {
      featuredCard: true,
      title: "Current Balance",
      amount: userData.balance,
    },
    {
      featuredCard: false,
      title: "Income",
      amount: userData.income,
    },
    {
      featuredCard: false,
      title: "Expenses",
      amount: expenses,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-3 mb-8">
      {stats.map((stat) => (
        <Card
          amount={stat.amount}
          featuredCard={stat.featuredCard}
          title={stat.title}
          key={stat.title}
        />
      ))}
    </div>
  );
}
