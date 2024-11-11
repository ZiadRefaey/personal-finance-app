"use client";
import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { UserDetailsForm } from "@/app/_lib/types";
import InputError from "../UI/InputError";

export default function OverviewForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsForm>();
  async function clientAction(data: UserDetailsForm) {
    console.log(data);
    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center flex-col gap-4"
    >
      <InputContainer>
        <Label>Current Balance</Label>
        <Input
          register={{
            ...register("balance", {
              required: "This field is required",
              min: { value: 0, message: "Balance cannot be less than 0" },
            }),
          }}
          name="balance"
          type="number"
        />
        {errors.balance && <InputError>{errors.balance.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Income</Label>
        <Input
          register={{
            ...register("income", {
              required: "This field is required",
              min: { value: 0, message: "Income cannot be less than 0" },
            }),
          }}
          name="income"
          type="number"
        />
        {errors.income && <InputError>{errors.income.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Day of income</Label>
        <Input
          register={{
            ...register("incomeDay", {
              required: "This field is required",
              min: { value: 1, message: "Day must be between 1 and 28" },
              max: { value: 28, message: "Day must be between 1 and 28" },
            }),
          }}
          name="incomeDay"
          type="number"
        />
        {errors.incomeDay && (
          <InputError>{errors.incomeDay.message}</InputError>
        )}
      </InputContainer>
      <Button className="w-full mt-5" type="submit">
        {isSubmitting ? "Editing..." : "Edit Details"}
      </Button>
    </form>
  );
}
