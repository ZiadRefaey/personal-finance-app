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
import { useForm } from "react-hook-form";
import InputError from "../UI/InputError";
import { PotWithdrawFormInputs } from "@/app/_lib/types";

export default function PotWithdrawalForm({
  currentSaved,
  id,
}: {
  currentSaved: number;
  id: number;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PotWithdrawFormInputs>();
  const { setOpenModal } = useModal();
  async function clientAction(data: any) {
    const amountToAdd = data.amount;
    const saved = currentSaved - Number(amountToAdd);
    const error = await UpdatePotsSaved(id, saved);
    if (error) {
      toast({ title: "Something went wrong.", description: error });
    } else {
      toast({ title: "Amount successfully withdarwn." });
      reset();
      setOpenModal("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="flex flex-col items-center justify-center gap-5 w-full"
    >
      <InputContainer>
        <Label>Amount to Withdraw</Label>
        <Input
          register={{
            ...register("amount", {
              required: "This field is required.",
              min: { value: 1, message: "Minimum withdrawal is 1." },
              max: {
                value: currentSaved,
                message: `You can't withdraw more than what is deposited. Maximum withdrawal is ${currentSaved}`,
              },
            }),
          }}
          name="amount"
          type="number"
          prefix={<FaDollarSign className="text-border" />}
        />
        {errors.amount && <InputError>{errors.amount.message}</InputError>}
      </InputContainer>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? "Withdawring..." : "Confirm Withdrawal"}
      </Button>
    </form>
  );
}
