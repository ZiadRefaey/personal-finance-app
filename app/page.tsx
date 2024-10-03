import OverviewStatsCardsList from "./_components/OverviewStatsCardsList";

export default function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-preset-1 mb-[42px] text-primary">Overview</h1>
      <OverviewStatsCardsList />
      <div className="w-full h-[561px] grid grid-cols-[0.587fr,0.413fr]">
        <div className=" size-full bg-cyan"></div>
        <div className=" size-full bg-red"></div>
      </div>
    </div>
  );
}
