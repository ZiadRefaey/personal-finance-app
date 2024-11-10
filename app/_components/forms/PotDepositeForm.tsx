"use client";
import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { FaDollarSign } from "react-icons/fa6";
import Button from "../UI/Button";
import { UpdatePotsSaved } from "@/app/_lib/actions";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { PotOperationInput } from "@/app/_lib/types";
import { useForm } from "react-hook-form";
import InputError from "../UI/InputError";
export default function PotDepositeForm({
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
  } = useForm<PotOperationInput>();
  const { setOpenModal } = useModal();
  async function clientAction(data: { amount: number }) {
    const amountToAdd = data.amount;
    const saved = currentSaved + Number(amountToAdd);
    const error = await UpdatePotsSaved(id, saved);
    if (error) {
      toast({ title: "Something went wrong.", description: error });
    } else {
      toast({ title: "Amount successfully deposited." });
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
        <Label>Amount to Add</Label>
        <Input
          register={{
            ...register("amount", {
              required: "This field is required",
              min: { value: 1, message: "Must be greater than 0" },
            }),
          }}
          name="amount"
          type="number"
          prefix={<FaDollarSign className="text-border" />}
        />
        {errors.amount && <InputError>{errors.amount.message}</InputError>}
      </InputContainer>
      <Button type="submit" className="w-full">
        {isSubmitting ? "Adding..." : "Confirm Addition"}
      </Button>
    </form>
  );
}
