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
import TR from "./UI/TR";
import TD from "./UI/TD";
import TH from "./UI/TH";
import PopoverButton from "./UI/PopoverButton";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import TransactionForm from "./forms/TransactionForm";
import { SearchParamsType, Transaction } from "../_lib/types";
import { DeleteTransaction } from "../_lib/actions";
import DeleteForm from "./forms/DeleteForm";
interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

type ColumnSort = {
  id: string;
  desc: boolean;
};
type SortingState = ColumnSort[];

export const TransactionTableContext = createContext<any>(null);
export const FeaturesStatesContext = createContext<any>(null);
export default function TransactionTable({
  data,
  setData,
  categories,
  vendorNames,
  searchParams,
}: {
  searchParams: SearchParamsType;
  data: Transaction[];
  setData: any;
  categories: string[];
  vendorNames: string[];
}) {
  const columnHelper = createColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Vendor",
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
    columnHelper.display({
      header: "Actions",
      cell: (props) => (
        <PopoverEllipsisTrigger
          content={
            <>
              <PopoverButton>
                <Modal>
                  <ModalTrigger
                    variant="ellipses"
                    modalName="edit-transaction"
                    className=""
                  >
                    Edit Transaction
                  </ModalTrigger>
                  <ModalWindow
                    header={`Edit transaction?`}
                    modalName="edit-transaction"
                    description="Edit your bill to track your monthly paid subsciptions. these will help calculate your fixed expenses each month."
                  >
                    <TransactionForm
                      categories={categories}
                      vendorNames={vendorNames}
                      transactionsData={data}
                      setTransactionData={setData}
                      formData={{
                        amount: props.row.original.amount,
                        budget: props.row.original.category,
                        vendor: props.row.original.name,
                        id: props.row.original.id,
                      }}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>

              <PopoverButton>
                <Modal>
                  <ModalTrigger
                    variant="ellipses"
                    modalName="delete-transaction"
                  >
                    Delete Transaction
                  </ModalTrigger>
                  <ModalWindow
                    header={`delete Transactions?`}
                    modalName="delete-transaction"
                    description="Are you sure you want to delete this transaction? This action cannot be reversed, and all the data inside it will be removed forever."
                  >
                    <DeleteForm
                      tableData={data}
                      setTableData={setData}
                      action={DeleteTransaction}
                      id={props.row.original.id}
                      deleteMessage="Transaction was successfully deleted."
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>
            </>
          }
        />
      ),
    }),
  ];
  //if the search params is all transactions then we assign the initial state to empty string to show all transactions
  const globalFilterInitialState =
    searchParams.filter === "all transactions" ? "" : searchParams.filter;
  const [globalFilter, setGlobalFilter] = useState<any>([
    globalFilterInitialState,
  ]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
      sorting,
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
          <TransactionsTableControls
            filters={categories}
            setSorting={setSorting}
            table={table}
          />
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
                  {row.getVisibleCells().map((cell) => (
                    <TD
                      className={`${
                        cell.column.id === "name"
                          ? "col-span-2"
                          : cell.column.id === "category"
                          ? "hidden md:table-cell"
                          : ""
                      }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TD>
                  ))}
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
