import Image from "next/image";
import React from "react";

type TransactionType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: boolean;
};
export default function TransactionRow({
  name,
  image,
  amount,
  date,
  deposite,
}: TransactionType) {
  {
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
}
