"use client";
import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { FaDollarSign } from "react-icons/fa6";
import Button from "../UI/Button";
import { useModal } from "../Modal";
import { UpdatePotsSaved } from "@/app/_lib/actions";
import { toast } from "@/hooks/use-toast";

export default function PotWithdrawalForm({
  currentSaved,
  id,
}: {
  currentSaved: number;
  id: number;
}) {
  const { setOpenModal } = useModal();
  async function clientAction(formData: FormData) {
    const amountToAdd = formData.get("amount");
    const saved = currentSaved - Number(amountToAdd);
    const error = await UpdatePotsSaved(id, saved);
    if (error) {
      toast({ title: "Something went wrong.", description: error });
    } else {
      toast({ title: "Amount successfully withdarwn." });
      setOpenModal("");
    }
  }
  return (
    <form
      action={clientAction}
      className="flex flex-col items-center justify-center gap-5 w-full"
    >
      <InputContainer>
        <Label>Amount to Withdraw</Label>
        <Input
          name="amount"
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
      </InputContainer>
      <Button type="submit" className="w-full">
        Confirm Withdrawal
      </Button>
    </form>
  );
}
