"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaDollarSign } from "react-icons/fa6";
import colors from "@/app/_lib/colors.json";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { useForm } from "react-hook-form";
import { BudgetFormInputs } from "@/app/_lib/types";
import InputError from "../UI/InputError";

export default function BudgetForm({
  action,
  id,
  successMessage,
  formData,
}: {
  action: (
    title: string,
    amount: number,
    color: string,
    id: number
  ) => Promise<void | string>;
  id: number;
  successMessage: string;
  formData?: {
    color: string;
    title: string;
    total: number;
  };
}) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormInputs>({
    defaultValues: {
      title: formData?.title || "",
      amount: formData?.total || undefined,
    },
  });

  const { setOpenModal } = useModal();
  const { toast } = useToast();
  function handleCloseModal() {
    setOpenModal("");
  }
  async function clientAction(data: BudgetFormInputs) {
    const result = await action(data.title, data.amount, data.color, id);
    if (result) {
      toast({
        title: "Something went wrong!",
        description: result,
      });
    } else {
      toast({ title: successMessage });
      reset();
      handleCloseModal();
    }
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Budget Category</Label>
        <Input
          register={{
            ...register("title", {
              required: "This field is required.",
              minLength: {
                value: 2,
                message: "Title must have atleast 2 characters",
              },
            }),
          }}
          name="title"
          type="text"
        />
        {errors.title && <InputError>{errors.title.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Maximum Spend</Label>
        <Input
          name="amount"
          register={{
            ...register("amount", {
              required: "This field is required.",
              min: {
                value: 1,
                message: "The budget's maximum must be more than 0",
              },
            }),
          }}
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
        {errors.amount && <InputError>{errors.amount.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Theme</Label>
        <Select
          onValueChange={(value) => setValue("color", value)}
          name="color"
        >
          <SelectTrigger
            {...register("color", { required: "This field is required" })}
            className="w-full bg-white text-navbar py-[22px] rounded-lg"
          >
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {colors.map((color) => (
              <SelectItem value={color} key={color}>
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`size-4 rounded-full`}
                    style={{ backgroundColor: `var(--${color})` }}
                  ></div>
                  <p className="text-preset-4 capitalize">{color}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.color && <InputError>{errors.color.message}</InputError>}
      </InputContainer>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        {formData && isSubmitting
          ? "Updating..."
          : formData
          ? "Update Budget"
          : !formData && isSubmitting
          ? "Creating..."
          : "Create Budget"}
      </Button>
    </form>
  );
}
