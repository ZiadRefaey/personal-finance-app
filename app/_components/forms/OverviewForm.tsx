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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

function getIncomeDate(day: number | undefined) {
  const date = new Date();
  date.setDate(day || 1);
  return date;
}

function getOrdinalDay(day: number) {
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix}`;
}

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
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsForm>({
    defaultValues: {
      balance: userData?.balance,
      income: userData?.income,
      incomeDay: userData?.incomeDay,
    },
  });
  const incomeDay = watch("incomeDay");
  const selectedIncomeDate = getIncomeDate(incomeDay);
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
        <input
          type="hidden"
          {...register("incomeDay", {
            required: "This field is required",
            min: { value: 1, message: "Day must be between 1 and 28" },
            max: { value: 28, message: "Day must be between 1 and 28" },
          })}
        />
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-start gap-4 rounded-lg border border-border bg-white px-5 py-[14px] text-left text-navbar outline-none transition-colors duration-150 hover:border-primary"
            >
              <FaCalendar className="text-border" />
              <span className="text-preset-4">
                {incomeDay
                  ? `Every month on the ${getOrdinalDay(Number(incomeDay))}`
                  : "Pick income day"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedIncomeDate}
              defaultMonth={selectedIncomeDate}
              disabled={(date) => date.getDate() > 28}
              onSelect={(date) => {
                if (!date) return;
                setValue("incomeDay", date.getDate(), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              footer={
                <p className="px-3 pb-3 pt-1 text-center text-xs text-slate-500">
                  {incomeDay
                    ? `${format(
                        selectedIncomeDate,
                        "MMMM d"
                      )} saves as day ${incomeDay}.`
                    : "Choose a day between 1 and 28."}
                </p>
              }
            />
          </PopoverContent>
        </Popover>
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
