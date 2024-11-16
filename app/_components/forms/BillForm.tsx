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
import { BillFormType } from "@/app/_lib/types";
import InputError from "../UI/InputError";
import { CreateBill, UpdateBill } from "@/app/_lib/actions";
import { useModal } from "../Modal";
import { useToast } from "@/hooks/use-toast";

export default function BillForm({
  vendorsNames,
  formData,
  id,
}: {
  vendorsNames: string[];
  formData?: BillFormType;
  id?: number;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BillFormType>({
    defaultValues: {
      amount: formData?.amount || undefined,
      date: formData?.date || undefined,
      vendor: formData?.vendor || undefined,
    },
  });
  const { setOpenModal } = useModal();
  const { toast } = useToast();
  async function clientAction(data: BillFormType) {
    try {
      //if form data was passed to the component then it should update and if not then it should create a new one
      if (formData && id) {
        await UpdateBill(id, data);
        toast({ title: "Bill updated successfully" });
      } else {
        await CreateBill(data.date, data.amount, data.vendor);
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
            {vendorsNames.map((vendorName) => (
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
        <Input
          register={{
            ...register("date", {
              required: "This field is required",
              min: { value: 1, message: "Day must be between 1 and 28" },
              max: { value: 28, message: "Day must be between 1 and 28" },
            }),
          }}
          name="date"
          type="number"
          prefix={<FaCalendar className="text-border" />}
        />
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