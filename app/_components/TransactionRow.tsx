import Image from "next/image";
import React from "react";
import { FormatNumber } from "../_lib/helperFuncs";

type TransactionType = {
  name: string;
  image: string;
  amount: number;
  date: string;
};
export default function TransactionRow({
  name,
  image,
  amount,
  date,
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
          <p className={`text-primary text-preset-3 mb-2`}>
            ${FormatNumber(amount)}
          </p>
          <p className="text-preset-5 text-secondary">
            {new Date(date).toDateString()}
          </p>
        </div>
      </div>
    );
  }
}
