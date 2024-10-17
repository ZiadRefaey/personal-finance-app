"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import TablePagination from "./TablePagination";
import avatar from "@/public/avatars/emma-richardson.jpg";
import { createColumnHelper } from "@tanstack/react-table";
type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  deposite: boolean;
};
const columnHelper = createColumnHelper<Transaction>();
const columns = [
  columnHelper.accessor("name", {
    header: "Recepient / Sender",
    cell: (props) => (
      <RecepientReceiver
        image={props.row.original.avatar}
        category={props.row.original.category}
        name={props.getValue()}
      />
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (props) => <Category>{props.getValue()}</Category>,
  }),
  columnHelper.accessor("date", {
    header: "Transaction Date",
    cell: (props) => props.getValue().toDateString(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (props) => (
      <Amount
        amount={props.getValue()}
        deposite={props.row.original.deposite}
      />
    ),
  }),
];

export default function TransactionTable() {
  return (
    <>
      <table className="w-full mt-6 divide-y divide-seperator">
        <thead className="hidden md:table-header-group mb-6 my-3">
          <TR className="text-start">
            <TH>Recepient / Sender</TH>

            <TH>Category</TH>

            <TH>Transaction Date</TH>

            <TH>Amount</TH>
          </TR>
        </thead>
        <tbody className="divide-y divide-seperator">
          <TR>
            <RecepientReceiver
              category="Personal Care"
              image={avatar}
              name="Emma Richardson"
            />
            <Category>Personal Care</Category>
            <TD>19 Aug 2024</TD>
            <Amount amount={75.5} deposite={true} />
          </TR>
        </tbody>
      </table>
      <TablePagination />
    </>
  );
}
function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`${className} p-0 md:p-4 self-center`}>{children}</td>;
}

function TR({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`${className} grid grid-cols-[63%,1fr] grid-rows-2 md:table-row  text-secondary text-preset-5`}
    >
      {children}
    </tr>
  );
}

function TH({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={`${className} text-start text-preset-5 text-secondary p-4`}>
      {children}
    </th>
  );
}
function Amount({ deposite, amount }: { deposite: boolean; amount: number }) {
  return (
    <div
      className={`${
        deposite === true ? "text-green" : "text-red"
      } text-preset-4-bold`}
    >
      {deposite ? "+" : "-"}
      {amount.toFixed(2)}
    </div>
  );
}

type TitleType = {
  image: any;
  name: string;
  category: string;
};
function RecepientReceiver({ image, name, category }: TitleType) {
  return (
    <div className="flex items-center justify-start gap-4 row-span-2 py-4">
      <div className="relative size-10">
        <Image
          src={image}
          fill
          alt={`${name}'s avatar`}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-primary text-preset-4-bold">{name}</p>
        <p className="text-preset-5 text-secondary md:hidden">{category}</p>
      </div>
    </div>
  );
}
function Category({ children }: { children: ReactNode }) {
  return <div className="hidden md:table-cell">{children}</div>;
}
