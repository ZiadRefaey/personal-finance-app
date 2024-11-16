import { createColumnHelper } from "@tanstack/react-table";
import { Bills } from "../_lib/types";
import { BillsTitle, DueDate, Amount } from "./BillsTable";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import PopoverButton from "./UI/PopoverButton";
import { Modal, ModalTrigger, ModalWindow } from "./Modal";
import ConfirmForm from "./forms/ConfirmForm";
const columnHelper = createColumnHelper<Bills>();
export const billsColumns = [
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
      <DueDate date={new Date(props.getValue()).toDateString()} status="due" />
    ),
    sortingFn: "datetime",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (props) => <Amount amount={props.getValue()} due={false} />,
    sortingFn: "alphanumeric",
  }),
  columnHelper.display({
    header: "actions",
    cell: (props) => (
      <PopoverEllipsisTrigger
        content={
          <PopoverButton
          // className="py-2 w-[120px] text-center flex items-center justify-center"
          // hover="hover:bg-green hover:text-white"
          >
            <Modal>
              <ModalTrigger modalName="paybill" className="">
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
        }
      />
    ),
  }),
];
