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
import Button from "../Button";
const recpeients = [
  "Emma Richardson",
  "Savory Bites Bistro",
  "Daniel Carter",
  "Sun Park",
];
const categories = ["Entertainment", "Bills", "Dining Out", "Personal Care"];
export default function NewTransactionForm() {
  return (
    <form className="w-full flex items-center justify-center gap-3 flex-col">
      <InputContainer>
        <Label>Recepient</Label>
        <Select>
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
            <SelectValue placeholder="Recepient" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {recpeients.map((recepient) => (
              <SelectItem value={recepient} key={recepient}>
                <p className="text-preset-4 capitalize">{recepient}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputContainer>

      <InputContainer>
        <Label>Amount</Label>
        <Input type="text" prefix={<FaDollarSign className="text-border" />} />
      </InputContainer>

      <InputContainer>
        <Label>Category</Label>
        <Select>
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

      <Button className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2">
        Confirm Transaction
      </Button>
    </form>
  );
}
