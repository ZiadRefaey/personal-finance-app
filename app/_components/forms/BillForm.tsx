"use client";
import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "../UI/Input";
import { FaCalendar, FaDollarSign } from "react-icons/fa6";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { BillFormType, Bills } from "@/app/_lib/types";
import InputError from "../UI/InputError";
import { CreateBill, UpdateBill } from "@/app/_lib/actions";
import { useModal } from "../Modal";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

function getPaymentDate(day: number | undefined) {
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

export default function BillForm({
  billsTableData,
  setBillsTableData,
  vendorNames,
  formData,
  id,
}: {
  billsTableData?: Bills[];
  setBillsTableData: any;
  vendorNames: string[];
  formData?: BillFormType;
  id?: number;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BillFormType>({
    defaultValues: {
      amount: formData?.amount || undefined,
      date: formData?.date || undefined,
      vendor: formData?.vendor || undefined,
    },
  });
  const paymentDay = watch("date");
  const selectedPaymentDate = getPaymentDate(paymentDay);
  const { setOpenModal } = useModal();
  const { toast } = useToast();
  async function clientAction(data: BillFormType) {
    try {
      //if form data was passed to the component then it should update and if not then it should create a new one
      if (formData && id) {
        const result = await UpdateBill(id, data);
        const updatedBillsTableData = billsTableData?.map((tableRow) =>
          tableRow.id !== id
            ? tableRow
            : {
                title: result[0].vendors.name,
                amount: result[0].amount,
                date: result[0].due_date,
                id: result[0].id,
                image: result[0].vendors.image,
                pay_day: result[0].pay_day,
                status: result[0].status,
              }
        );
        setBillsTableData(updatedBillsTableData);
        toast({ title: "Bill updated successfully" });
      } else {
        const result = await CreateBill(data.date, data.amount, data.vendor);
        const newBill: Bills = {
          title: result[0].vendors.name,
          amount: result[0].amount,
          date: result[0].due_date,
          id: result[0].id,
          image: result[0].vendors.image,
          pay_day: result[0].pay_day,
          status: result[0].status,
        };
        setBillsTableData((prev: Bills[]) => [...prev, newBill]);
        toast({ title: "Bill added successfully" });
      }
      reset();
      setOpenModal("");
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Vendor</Label>
        <Select
          defaultValue={formData ? formData.vendor : undefined}
          onValueChange={(value) => {
            setValue("vendor", value);
          }}
          name="vendor"
        >
          <SelectTrigger
            {...register("vendor", { required: "This field is required." })}
            className="w-full bg-white text-navbar py-[22px] rounded-lg"
          >
            <SelectValue placeholder="Vendors" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {vendorNames.map((vendorName) => (
              <SelectItem value={vendorName} key={vendorName}>
                <p className="text-preset-4 capitalize">{vendorName}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.vendor && <InputError>{errors.vendor.message}</InputError>}
      </InputContainer>

      <InputContainer>
        <Label>Amount</Label>
        <Input
          register={{
            ...register("amount", {
              required: "This field is required",
              min: { value: 1, message: "The amount must be larget than 0" },
            }),
          }}
          name="amount"
          type="number"
          prefix={<FaDollarSign className="text-border" />}
        />
        {errors.amount && <InputError>{errors.amount.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Day of payment</Label>
        <input
          type="hidden"
          {...register("date", {
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
                {paymentDay
                  ? `Every month on the ${getOrdinalDay(Number(paymentDay))}`
                  : "Pick payment day"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedPaymentDate}
              defaultMonth={selectedPaymentDate}
              disabled={(date) => date.getDate() > 28}
              onSelect={(date) => {
                if (!date) return;
                setValue("date", date.getDate(), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              footer={
                <p className="px-3 pb-3 pt-1 text-center text-xs text-slate-500">
                  {paymentDay
                    ? `${format(
                        selectedPaymentDate,
                        "MMMM d"
                      )} saves as day ${paymentDay}.`
                    : "Choose a day between 1 and 28."}
                </p>
              }
            />
          </PopoverContent>
        </Popover>
        {errors.date && <InputError>{errors.date.message}</InputError>}
      </InputContainer>
      <Button
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        {formData && isSubmitting
          ? "Updating..."
          : formData
          ? "Update Bill"
          : !formData && isSubmitting
          ? "Adding..."
          : "Add Bill"}
      </Button>
    </form>
  );
}
