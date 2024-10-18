"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import TablePagination from "./TablePagination";
import Data from "@/transactionsData.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import page from "../budgets/page";
type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  deposite: boolean;
};
const TableData = Data.map((item) => ({
  ...item,
  date: new Date(item.date),
}));
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
  const [data, setData] = useState<Transaction[]>(TableData);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state

    state: {
      pagination,
    },
  });

  return (
    <>
      <table className="w-full mt-6 divide-y divide-seperator min-h-[86vh]">
        <thead className="hidden md:table-header-group mb-6 my-3">
          {table.getHeaderGroups().map((headerGroup) => (
            <TR key={headerGroup.id}>
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
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === "name")
                  return (
                    <TD className="col-span-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TD>
                  );
                if (cell.column.id === "category")
                  return (
                    <TD className="hidden md:table-cell" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TD>
                  );
                return (
                  <TD key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TD>
                );
              })}
            </TR>
          ))}
        </tbody>
      </table>
      <TablePagination table={table} />
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
    <div className="flex items-center justify-start gap-4 pt-4  md:py-0">
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
