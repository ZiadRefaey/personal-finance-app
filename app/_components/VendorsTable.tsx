import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { VendorType } from "../_lib/types";
import Image from "next/image";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import PopoverButton from "./UI/PopoverButton";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import VendorForm from "./forms/VendorForm";
import TR from "./UI/TR";
import TD from "./UI/TD";
import TableControls from "./TableControls";
import TH from "./UI/TH";
import TablePagination from "./TablePagination";
import { DeleteVendor } from "../_lib/actions";
import DeleteForm from "./forms/DeleteForm";

export default function VendorsTable({
  data,
  setData,
}: {
  data: VendorType[];
  setData: any;
}) {
  const columnHelper = createColumnHelper<VendorType>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Vendor",
      cell: (props) => (
        <VendorTitle
          image={props.row.original.image}
          title={props.getValue()}
        />
      ),
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
                    modalName="edit-vendor"
                    className=""
                  >
                    Edit Vendor
                  </ModalTrigger>
                  <ModalWindow
                    header={`Edit Vendor?`}
                    modalName="edit-vendor"
                    description="Edit your vendor to modify there details. edited vendors will be updated all across your existing transactions and bills."
                  >
                    <VendorForm
                      id={props.row.original.id}
                      existingFormData={props.row.original.name}
                    />
                  </ModalWindow>
                </Modal>
              </PopoverButton>

              <PopoverButton>
                <Modal>
                  <ModalTrigger variant="ellipses" modalName="delete-vendor">
                    Delete Vendor
                  </ModalTrigger>
                  <ModalWindow
                    header={`Delete Vendor?`}
                    modalName="delete-vendor"
                    description="Are you sure you want to delete this vendor? This action cannot be reversed, All transactions and bills associated with that vendor will be deleted. are you sure you want to continue?"
                  >
                    <DeleteForm
                      tableData={data}
                      setTableData={setData}
                      action={DeleteVendor}
                      id={props.row.original.id}
                      deleteMessage="Vendor was successfully deleted along with the associated transactions and bills."
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
  const [globalFilter, setGlobalFilter] = useState<any>([""]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    globalFilterFn: "includesString",
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <>
      <div className="w-full">
        <TableControls
          hasFilter={false}
          hasSort={false}
          placeHolder="Search Vendors"
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
                      cell.column.id === "category"
                        ? "hidden md:table-cell"
                        : ""
                    }`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TD>
                ))}
              </TR>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />
    </>
  );
}

function VendorTitle({ image, title }: { image: string; title: string }) {
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
