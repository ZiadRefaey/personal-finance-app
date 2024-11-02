"use client";
import React from "react";
import Button from "../Button";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
type ActionFunction = (id: number) => Promise<void | string>;

export default function DeleteForm({
  action,
  id,
  deleteMessage,
}: {
  action: ActionFunction;
  id: number;
  deleteMessage: string;
}) {
  const { setOpenModal } = useModal();
  async function clientAction() {
    const result = await action(id);
    if (result) {
      toast({ title: "Sometihng went wrong", description: result });
    } else {
      toast({ title: deleteMessage });
      setOpenModal("");
    }
  }
  return (
    <form
      action={clientAction}
      className="w-full flex items-center justify-center flex-col"
    >
      <Button
        className="bg-red text-white hover:opacity-70 mb-3 w-full hover:bg-red"
        type="submit"
      >
        Yes, Confirm Deletion
      </Button>
      <button
        type="reset"
        className="py-2 text-secondary hover:text-primary duration-150 transition-all w-full"
      >
        No, Go Back
      </button>
    </form>
  );
}
