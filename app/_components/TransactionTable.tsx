"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { createContext, ReactNode, useState } from "react";
import TablePagination from "./TablePagination";
import TransactionsTableControls from "./TransactionsTableControls";
import { FormatNumber } from "../_lib/helperFuncs";
interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  deposite: boolean;
};
type ColumnSort = {
  id: string;
  desc: boolean;
};
type SortingState = ColumnSort[];

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
    sortingFn: "text",
  }),
  columnHelper.accessor("date", {
    header: "Transaction Date",
    cell: (props) => props.getValue().toDateString(),
    sortingFn: "datetime",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (props) => <Amount amount={props.getValue()} />,
    sortingFn: "alphanumeric",
  }),
];
export const TransactionTableContext = createContext<any>(null);
export const FeaturesStatesContext = createContext<any>(null);
export default function TransactionTable({ data }: { data: Transaction[] }) {
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [sorting, setSorting] = useState<SortingState>([]); // can set initial sorting state here
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(), //provide a sorting row model
    globalFilterFn: "includesString",
    state: {
      pagination,
      globalFilter,
      sorting: sorting.length > 0 ? sorting : [{ id: "date", desc: true }],
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <TransactionTableContext.Provider value={table}>
      <FeaturesStatesContext.Provider value={{ setSorting, setColumnFilters }}>
        <div className="w-full">
          <TransactionsTableControls table={table} />
          <table className="w-full mt-6 divide-y divide-seperator ">
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TD>
                    );
                  })}
                </TR>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination table={table} />
      </FeaturesStatesContext.Provider>
    </TransactionTableContext.Provider>
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
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <th
      onClick={onClick}
      className={`${className} text-start text-preset-5 text-secondary p-4`}
    >
      {children}
    </th>
  );
}
function Amount({ amount }: { amount: number }) {
  return (
    <div className={`text-primary text-preset-4-bold`}>
      {FormatNumber(amount)}
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
