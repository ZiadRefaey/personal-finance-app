interface CardType {
  featuredCard: boolean;
  title: string;
  amount: string;
}
type stats = CardType[];
const stats = [
  {
    featuredCard: true,
    title: "Current Balance",
    amount: "4,836.00",
  },
  {
    featuredCard: false,
    title: "Income",
    amount: "3,814.25",
  },
  {
    featuredCard: false,
    title: "Expenses",
    amount: "1,700.50",
  },
];
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
      <p className={`text-preset-1`}>${amount}</p>
    </div>
  );
}
export default function OverviewStatsCardsList() {
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
