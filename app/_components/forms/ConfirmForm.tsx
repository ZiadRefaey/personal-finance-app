"use client";
import React from "react";
import Button from "../UI/Button";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { PayBill } from "@/app/_lib/actions";

export default function ConfirmForm({ id }: { id: number }) {
  const { setOpenModal } = useModal();
  async function clientAction() {
    try {
      await PayBill(id);
      toast({ title: "Bill successfully paid" });
      setOpenModal("");
    } catch (error: any) {
      toast({ title: "Sometihng went wrong", description: error.message });
    }
  }
  return (
    <form
      onSubmit={clientAction}
      className="w-full flex items-center justify-center flex-col"
    >
      <Button
        className="bg-green text-white hover:opacity-70 mb-3 w-full hover:bg-green"
        type="submit"
      >
        Yes, Confirm Payment
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
