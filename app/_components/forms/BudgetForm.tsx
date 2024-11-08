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
type ActionFunction = (
  formData: FormData,
  id: number
) => Promise<void | string>;

export default function BudgetForm({
  action,
  id,
  successMessage,
  formData,
}: {
  action: ActionFunction;
  id: number;
  successMessage: string;
  formData?: {
    color: string;
    title: string;
    total: number;
  };
}) {
  function formDataExists(input: any) {
    if (formData) return input;
    else return null;
  }
  const { setOpenModal } = useModal();
  const { toast } = useToast();
  function handleCloseModal() {
    setOpenModal("");
  }
  async function clientAction(formData: FormData) {
    const result = await action(formData, id);
    if (result) {
      toast({
        title: "Something went wrong!",
        description: result,
      });
    } else {
      toast({ title: successMessage });
      handleCloseModal();
    }
  }
  return (
    <form
      action={clientAction}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Budget Category</Label>
        <Input
          defaultValue={formDataExists(formData?.title)}
          name="category"
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <Label>Maximum Spend</Label>
        <Input
          defaultValue={formDataExists(formData?.total)}
          name="max"
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
      </InputContainer>
      <InputContainer>
        <Label>Theme</Label>
        <Select name="color">
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
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
      </InputContainer>
      <Button
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        Add Budget
      </Button>
    </form>
  );
}
