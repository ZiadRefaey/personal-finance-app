"use client";
import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { userData, UserDetailsForm } from "@/app/_lib/types";
import InputError from "../UI/InputError";
import { toast } from "@/hooks/use-toast";
import { UpdateUser } from "@/app/_lib/actions";
import { FaDollarSign } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa6";
import { useModal } from "../Modal";

export default function OverviewForm({
  userData,
  userId,
}: {
  userData: userData;
  userId: number;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsForm>({
    defaultValues: {
      balance: userData?.balance,
      income: userData?.income,
      incomeDay: userData?.incomeDay,
    },
  });
  const { setOpenModal } = useModal();
  async function clientAction(data: UserDetailsForm) {
    try {
      await UpdateUser(userId, data);
      toast({
        title: "Detailed Edited successfully.",
      });
      setOpenModal("");
      reset();
    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        description: error.message,
      });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center flex-col gap-4"
    >
      <InputContainer>
        <Label>Current Balance</Label>
        <Input
          prefix={<FaDollarSign className="text-border" />}
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
          prefix={<FaDollarSign className="text-border" />}
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
          prefix={<FaCalendar className="text-border" />}
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
