"use client";
import { createColumnHelper } from "@tanstack/react-table";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import PopoverButton from "./UI/PopoverButton";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import ConfirmForm from "./forms/ConfirmForm";
import BillForm from "./forms/BillForm";
import Image from "next/image";
import React, { useState } from "react";
import TR from "./UI/TR";
import TH from "./UI/TH";
import TD from "./UI/TD";
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
import DeleteForm from "./forms/DeleteForm";
import { DeleteBill } from "../_lib/actions";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function BillsTable({
  setData,
  data,
  vendorNames,
}: {
  setData: any;
  data: Bills[];
  vendorNames: string[];
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const columnHelper = createColumnHelper<Bills>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Bill Title",
      cell: (props) => (
        <BillsTitle title={props.getValue()} image={props.row.original.image} />
      ),
      sortingFn: "text",
    }),
    columnHelper.accessor("date", {
      header: "Due Date",
      cell: (props) => (
        <DueDate date={new Date(props.getValue()).toDateString()} />
      ),
      sortingFn: "datetime",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (props) => (
        <Amount amount={props.getValue()} status={props.row.original.status} />
      ),
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
                    disabled={
                      props.row.original.status === "paid" ? true : false
                    }
                    modalName="paybill"
                    variant="ellipses"
                  >
                    Pay Bill
                  </ModalTrigger>
                  <ModalWindow
                    header={`Pay ${props.row.original.title}'s Bill?`}
                    modalName="paybill"
                    description="Paying the current bill will subtract the value from your balance."
                  >
                    <ConfirmForm id={props.row.original.id} />
                  </ModalWindow>
                </Modal>
              </PopoverButton>

              <PopoverButton>
                <Modal>
                  <ModalTrigger
                    variant="ellipses"
                    modalName="edit-bill"
                    className=""
                  >
                    Edit Bill
                  </ModalTrigger>
                  <ModalWindow
                    header={`Edit ${props.row.original.title}'s Bill?`}
                    modalName="edit-bill"
                    description="Edit your bill to track your monthly paid subsciptions. these will help calculate your fixed expenses each month."
                  >
                    <BillForm
                      billsTableData={data}
                      setBillsTableData={setData}
                      formData={{
                        amount: props.row.original.amount,
                        date: props.row.original.pay_day,
                        vendor: props.row.original.title,
                      }}
                      vendorNames={vendorNames}
                      id={props.row.original.id}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>

              <PopoverButton>
                <Modal>
                  <ModalTrigger variant="ellipses" modalName="delete-bill">
                    Delete Bill
                  </ModalTrigger>
                  <ModalWindow
                    header={`delete ${props.row.original.title}'s Bill?`}
                    modalName="delete-bill"
                    description="Are you sure you want to delete this bill? This action cannot be reversed, and all the data inside it will be removed forever."
                  >
                    <DeleteForm
                      tableData={data}
                      setTableData={setData}
                      action={DeleteBill}
                      id={props.row.original.id}
                      deleteMessage="Bill was successfully deleted."
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
            <TR className="pt-[10px]" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TD key={cell.id}>
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
  image: string;
  title: string;
};
export function BillsTitle({ image, title }: TitleType) {
  return (
    <div className="flex items-center justify-start gap-4 col-span-2 ">
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
export function Amount({
  status,
  amount,
}: {
  status: "upcoming" | "paid" | "over due";
  amount: number;
}) {
  return (
    <div
      className={`text-preset-4-bold flex items-center justify-start gap-2 self-start`}
    >
      ${FormatNumber(amount)}
      {status === "paid" ? (
        <FaCheckCircle className="text-green inline-flex" />
      ) : status === "upcoming" ? (
        <FaExclamationCircle className="text-yellow" />
      ) : (
        <FaExclamationCircle className="text-red" />
      )}
    </div>
  );
}
export function DueDate({ date }: { date: string }) {
  return (
    <div className={`text-preset-5 flex items-center justify-start `}>
      {date}
    </div>
  );
}
