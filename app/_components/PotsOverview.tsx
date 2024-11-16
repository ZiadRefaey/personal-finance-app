import Card from "./UI/Card";

import Pot from "@/public/icon-pot.svg";
import Image from "next/image";
import OverviewSectionHeader from "./OverviewSectionHeader";
import { getPots } from "../_lib/data-service";
import { auth } from "@/auth";
import { FormatNumber } from "../_lib/helperFuncs";

type PotDetailsType = {
  title: string;
  amount: number;
  color: string;
};

export default async function PotsOverview() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const pots = await getPots(userId);
  const totalSaved = pots.reduce((acc, cur) => cur.saved + acc, 0);
  const HighestSavedPots = pots
    .toSorted((a: any, b: any) => b.saved - a.saved)
    .slice(0, 4);

  return (
    <Card>
      <OverviewSectionHeader
        title="Pots"
        popoverTitle="See Details"
        popoverContent={
          <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
            Click me
          </button>
        }
      />

      <div className=" gap-5 grid grid-cols-1 md:grid-cols-[247px,1fr]">
        <div className="rounded-xl bg-background flex items-center justify-start p-4 gap-4">
          <Image src={Pot} alt="Pot Icon" />
          <div className="">
            <p className="text-secondary text-preset-4 mb-3">Total Saved</p>
            <p className="text-primary text-preset-1">
              ${totalSaved.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {HighestSavedPots.map((pot) => (
            <PotDetails
              amount={pot.saved}
              key={pot.id}
              color={pot.color}
              title={pot.title}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
function PotDetails({ title, amount, color }: PotDetailsType) {
  return (
    <div className="flex items-center justify-start">
      <div
        className={`rounded-lg w-1 h-full mr-4`}
        style={{ backgroundColor: `var(--${color})` }}
      ></div>
      <div>
        <p className="text-secondary text-preset-5">{title}</p>
        <p className="text-preset-4-bold text-primary">
          ${FormatNumber(amount)}
        </p>
      </div>
    </div>
  );
}
