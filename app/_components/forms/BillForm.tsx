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

export default function BillForm({ vendorsNames }: { vendorsNames: string[] }) {
  return (
    <form className="w-full flex items-center justify-center gap-3 flex-col">
      <InputContainer>
        <Label>Vendor</Label>
        <Select name="vendor">
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
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
      </InputContainer>

      <InputContainer>
        <Label>Amount</Label>
        <Input
          name="amount"
          type="number"
          prefix={<FaDollarSign className="text-border" />}
        />
      </InputContainer>
      <InputContainer>
        <Label>Day of payment</Label>
        <Input
          name="date"
          type="number"
          prefix={<FaCalendar className="text-border" />}
        />
      </InputContainer>
      <Button
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        Add Bill
      </Button>
    </form>
  );
}
