import OverviewStatsCardsList from "./_components/OverviewStatsCardsList";
import PotsOverview from "./_components/PotsOverview";
import TransactionsOverview from "./_components/TransactionsOverview";
export default function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-preset-1 mb-[42px] text-primary">Overview</h1>
      <OverviewStatsCardsList />
      <div className="w-full h-[561px] grid grid-cols-[0.587fr,0.413fr] gap-6">
        <div className="w-full h-full flex flex-col gap-4 md:gap-6">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="w-full h-full bg-cyan"></div>
      </div>
    </div>
  );
}
