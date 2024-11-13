import { createColumnHelper } from "@tanstack/react-table";
import { Bills } from "../_lib/types";
import { BillsTitle, DueDate, Amount } from "./BillsTable";
const columnHelper = createColumnHelper<Bills>();
export const billsColumns = [
  columnHelper.accessor("name", {
    header: "Bill Title",
    cell: (props) => (
      <BillsTitle title={props.getValue()} image={props.row.original.avatar} />
    ),
  }),
  columnHelper.accessor("date", {
    header: "Due Date",
    cell: (props) => <DueDate date={props.getValue()} status="due" />,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (props) => <Amount amount={props.getValue()} due={false} />,
  }),
];
