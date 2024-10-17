"use state";
import Data from "@/transactionsData.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  deposite: boolean;
};
const columnHelper = createColumnHelper<Transaction>();
export default function DataTable() {
  const [data, setData] = useState<Transaction[]>([]);
  // const columnHelper = createColumnHelper
  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Recepient / Sender</span>,
    }),
  ];
  return <></>;
}
