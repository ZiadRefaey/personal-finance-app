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
import { FaDollarSign } from "react-icons/fa6";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { CreateTransaction } from "@/app/_lib/actions";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";

type namesType = string[];
export default function TransactionForm({
  categories,
  vendorsNames,
}: {
  categories: namesType;
  vendorsNames: namesType;
}) {
  const { setOpenModal } = useModal();
  async function clientAction(formData: FormData) {
    const result = await CreateTransaction(formData);
    if (result) toast({ title: "Something went wrong", description: result });
    else {
      toast({ title: "Transaction created successfuly" });
      setOpenModal("");
    }
  }
  return (
    <form
      action={clientAction}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Vendors</Label>
        <Select name="vendor">
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
            <SelectValue placeholder="Vendor" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {vendorsNames.map((vendor) => (
              <SelectItem value={vendor} key={vendor}>
                <p className="text-preset-4 capitalize">{vendor}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputContainer>

      <InputContainer>
        <Label>Amount</Label>
        <Input
          name="amount"
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
      </InputContainer>

      <InputContainer>
        <Label>Category</Label>
        <Select name="category">
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {categories.map((category) => (
              <SelectItem value={category} key={category}>
                <p className="text-preset-4 capitalize">{category}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputContainer>

      <Button
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        Confirm Transaction
      </Button>
    </form>
  );
}
