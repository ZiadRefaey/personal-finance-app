"use client";
import Image from "next/image";
import React, { useState } from "react";
import billPaid from "@/public/icon-bill-paid.svg";
import billDue from "@/public/icon-bill-due.svg";
import TR from "./UI/TR";
import TH from "./UI/TH";
import TD from "./UI/TD";
import { billsColumns as columns } from "./RecurringBillsColumns";
import { FormatNumber } from "../_lib/helperFuncs";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { sortingOptions } from "../_lib/constants";
import { Bills, SortingState } from "../_lib/types";
import TableControls from "./TableControls";

export default function BillsTable({ tableData }: { tableData: Bills[] }) {
  const [data, setData] = useState<Bills[]>(tableData);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const table = useReactTable({
    columns,
    data,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <>
      <TableControls
        table={table}
        placeHolder="Search Bills"
        sortingOptions={sortingOptions}
        setSorting={setSorting}
        hasFilter={false}
      />
      <table className="w-full mt-6 divide-y divide-seperator">
        <thead className="hidden md:table-header-group mb-6 my-3">
          {table.getHeaderGroups().map((headerGroup) => (
            <TR
              key={headerGroup.id}
              className="flex items-center justify-between"
            >
              {headerGroup.headers.map((header) => (
                <TH
                  className={`${
                    header.column.columnDef.header === "Amount"
                      ? "text-end"
                      : ""
                  }`}
                  key={header.id}
                >
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
    <div className="flex items-center justify-start gap-4 col-span-2 self-start">
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
      } text-preset-4-bold justify-self-end`}
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
