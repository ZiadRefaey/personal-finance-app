import Image from "next/image";
import React from "react";

type TransactionType = {
  name: string;
  image: string;
  amount: number;
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
          <div className="relative object-cover size-10">
            <Image
              src={image}
              fill
              alt={`${name}'s avatar`}
              className="rounded-full"
            />
          </div>
          <p className="text-preset-4-bold text-primary">{name}</p>
        </div>
        <div>
          <p
            className={`${
              deposite ? "text-green" : "text-red"
            } text-preset-4-bold mb-2`}
          >
            {deposite ? "+" : "-"}${amount.toFixed(2)}
          </p>
          <p className="text-5 text-secondary">
            {new Date(date).toDateString()}
          </p>
        </div>
      </div>
    );
  }
}
