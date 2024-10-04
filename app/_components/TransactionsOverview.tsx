import React from "react";
import Card from "./Card";
import PopoverComponent from "./PopoverComponent";
import Image from "next/image";
import Emma from "@/public/avatars/emma-richardson.jpg";
import Savory from "@/public/avatars/savory-bites-bistro.jpg";
import Daniel from "@/public/avatars/daniel-carter.jpg";
import Sun from "@/public/avatars/sun-park.jpg";
import Urban from "@/public/avatars/urban-services-hub.jpg";
type TransactionType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: boolean;
};
type TransactionsDataType = TransactionType[];
const TransactionsData: TransactionsDataType = [
  {
    name: "Emma Richardson",
    image: Emma,
    amount: "75.50",
    date: "19 Aug 2024",
    deposite: true,
  },
  {
    name: "Savory Bites Bistro",
    image: Savory,
    amount: "55.50",
    date: "19 Aug 2024",
    deposite: false,
  },
  {
    name: "Daniel Carter",
    image: Daniel,
    amount: "42.30",
    date: "18 Aug 2024",
    deposite: false,
  },
  {
    name: "Sun Park",
    image: Sun,
    amount: "120.00",
    date: "17 Aug 2024",
    deposite: true,
  },
  {
    name: "Urban Services Hub",
    image: Urban,
    amount: "65.00",
    date: "17 Aug 2024",
    deposite: false,
  },
];
export default function TransactionsOverview() {
  return (
    <Card>
      <div className="flex items-center justify-between w-full mb-5">
        <p className="text-preset-2 text-primary">Transactions</p>
        <PopoverComponent
          trigger={"See Details"}
          content={
            <div className="flex flex-col items-center justify-center gap-1">
              <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
                Click me
              </button>
            </div>
          }
        />
      </div>
      <div className="flex flex-col divide-y-[1px] -my-6 divide-seperator">
        {TransactionsData.map((row) => (
          <TransactionRow
            amount={row.amount}
            date={row.date}
            deposite={row.deposite}
            image={row.image}
            name={row.name}
            key={row.name}
          />
        ))}
      </div>
    </Card>
  );
}

function TransactionRow({
  name,
  image,
  amount,
  date,
  deposite,
}: TransactionType) {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center justify-center gap-4">
        <Image
          src={image}
          alt={`${name}'s avatar`}
          className="size-10 rounded-full"
        />
        <p className="text-preset-4-bold text-primary">{name}</p>
      </div>
      <div>
        <p
          className={`${
            deposite ? "text-green" : "text-red"
          } text-preset-4-bold mb-2`}
        >
          {deposite ? "+" : "-"}${amount}
        </p>
        <p className="text-5 text-secondary">{date}</p>
      </div>
    </div>
  );
}
