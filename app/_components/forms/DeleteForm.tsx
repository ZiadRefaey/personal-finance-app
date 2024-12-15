"use client";
import React from "react";
import Button from "../UI/Button";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { useFormStatus } from "react-dom";
type ActionFunction = (id: number) => Promise<void | string>;

export default function DeleteForm({
  action,
  id,
  deleteMessage,
  tableData,
  setTableData,
}: {
  action: ActionFunction;
  id: number;
  deleteMessage: string;
  tableData?: any;
  setTableData?: any;
}) {
  const { setOpenModal } = useModal();
  async function clientAction() {
    try {
      await action(id);
      //if the delete form is in a table action. update the table's ui after deleting
      if (tableData) {
        const filteredTableData = tableData.filter(
          (tableRow: any) => tableRow.id !== id
        );
        setTableData(filteredTableData);
      }
      toast({ title: deleteMessage });
      setOpenModal("");
    } catch (error: any) {
      toast({ title: "Sometihng went wrong", description: error.message });
    }
  }
  return (
    <form
      action={clientAction}
      className="w-full flex items-center justify-center flex-col"
    >
      <Submit />
      <button
        onClick={() => setOpenModal("")}
        type="reset"
        className="py-2 text-secondary hover:text-primary duration-150 transition-all w-full"
      >
        No, Go Back
      </button>
    </form>
  );
}
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-red text-white hover:opacity-70 mb-3 w-full hover:bg-red"
      type="submit"
    >
      {pending ? "Deleting..." : "Yes, Confirm Deletion"}
    </Button>
  );
}
