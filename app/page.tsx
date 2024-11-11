import { auth } from "@/auth";
import BudgetsOverview from "./_components/BudgetsOverview";
import OverviewStatsCardsList from "./_components/OverviewStatsCardsList";
import PotsOverview from "./_components/PotsOverview";
import RecurringBillsOverview from "./_components/RecurringBillsOverview";
import TransactionsOverview from "./_components/TransactionsOverview";
import { getUser } from "./_lib/data-service";

export default async function Home() {
  const session = await auth();
  const email = String(session?.user?.email);
  const userData = await getUser(email);
  return (
    <div className="w-full h-full">
      <h1 className="text-preset-1 mb-[42px] text-primary">Overview</h1>
      <OverviewStatsCardsList userData={userData} />
      <div className="w-full h-[561px] grid grid-cols-1 xl:grid-cols-[0.587fr,0.413fr] gap-6">
        <div className="w-full h-full flex flex-col gap-4 md:gap-6">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="w-full h-full flex flex-col gap-4 md:gap-6">
          <BudgetsOverview />
          <RecurringBillsOverview />
        </div>
      </div>
    </div>
  );
}
