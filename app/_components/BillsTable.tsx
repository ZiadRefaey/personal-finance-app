"use client";
import Image from "next/image";
import React from "react";
import avatar from "@/public/avatars/elevate-education.jpg";
import billPaid from "@/public/icon-bill-paid.svg";
import billDue from "@/public/icon-bill-due.svg";
import TR from "./UI/TR";
import TH from "./UI/TH";
import TD from "./UI/TD";
import { billsColumns as columns } from "./RecurringBillsColumns";
import transactionsData from "@/transactionsData.json";
import { FormatNumber } from "../_lib/helperFuncs";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
const data = transactionsData.filter(
  (transaction) => transaction.category === "Bills"
);
export default function BillsTable() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <table className="w-full mt-6 divide-y divide-seperator">
        <thead className="hidden md:table-header-group mb-6 my-3">
          {/* <TR className="text-start">
            <TH>Bill Title</TH>
            <TH>Due Date</TH>
            <TH>Amount</TH>
          </TR> */}
          {table.getHeaderGroups().map((headerGroup) => (
            <TR key={headerGroup.id} className="text-start">
              {headerGroup.headers.map((header) => (
                <TH key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TH>
              ))}
            </TR>
          ))}
        </thead>
        <tbody className="divide-y divide-seperator">
          {table.getRowModel().rows.map((row) => (
            <TR key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TD className="col-span-2" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TD>
              ))}
            </TR>
          ))}
        </tbody>
      </table>
    </>
  );
}

type TitleType = {
  image: any;
  title: string;
};
export function BillsTitle({ image, title }: TitleType) {
  return (
    <div className="flex items-center justify-start gap-4 pb-2 pt-5 md:py-4 col-span-2 self-start">
      <div className="relative size-10">
        <Image
          src={image}
          fill
          alt={`${title}'s avatar`}
          className="size-10 rounded-full"
        />
      </div>

      <p className="text-primary text-preset-4-bold">{title}</p>
    </div>
  );
}
export function Amount({ due, amount }: { due: boolean; amount: number }) {
  return (
    <div
      className={`${
        due === false ? "text-primary" : "text-red"
      } text-preset-4-bold pb-5 md:pb-4 justify-self-end`}
    >
      ${FormatNumber(amount)}
    </div>
  );
}
export function DueDate({
  date,
  status,
}: {
  date: string;
  status: "paid" | "due" | "overdue";
}) {
  return (
    <div
      className={`text-preset-5 flex items-center justify-start ${
        status === "paid"
          ? "text-green"
          : status === "overdue"
          ? "text-red"
          : "text-primary"
      }`}
    >
      {date}
      {status === "paid" ? (
        <span className="inline-flex ml-2">
          <Image src={billPaid} alt="Bill paid icon" />
        </span>
      ) : status === "overdue" ? (
        <span className="inline-flex ml-2">
          <Image src={billDue} alt="Bill due icon" />
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
