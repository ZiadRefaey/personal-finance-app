import Card from "./UI/Card";

import Pot from "@/public/icon-pot.svg";
import Image from "next/image";
import OverviewSectionHeader from "./OverviewSectionHeader";

type PotDetailsType = {
  title: string;
  amount: number;
  color: string;
};
const PotDetailsArray: PotDetailsType[] = [
  { title: "Savings", amount: 159, color: "bg-green" },
  { title: "Gift", amount: 40, color: "bg-cyan" },
  { title: "Concert Ticket", amount: 110, color: "bg-navy" },
  { title: "New Laptop", amount: 10, color: "bg-yellow" },
];
export default function PotsOverview() {
  return (
    <Card>
      <OverviewSectionHeader
        title="Pots"
        popoverTitle="See Details"
        popoverContent={
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
              Click me
            </button>
          </div>
        }
      />

      <div className=" gap-5 grid grid-cols-1 md:grid-cols-[247px,1fr]">
        <div className="rounded-xl bg-background flex items-center justify-start p-4 gap-4">
          <Image src={Pot} alt="Pot Icon" />
          <div className="">
            <p className="text-secondary text-preset-4 mb-3">Total Saved</p>
            <p className="text-primary text-preset-1">$850</p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {PotDetailsArray.map((obj) => (
            <PotDetails
              amount={obj.amount}
              key={obj.title}
              color={obj.color}
              title={obj.title}
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
      <div className={`rounded-lg ${color} w-1 h-full mr-4`}></div>
      <div>
        <p className="text-secondary text-preset-5">{title}</p>
        <p className="text-preset-4-bold text-primary">${amount}</p>
      </div>
    </div>
  );
}
