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
import Button from "../Button";

export default function PotForm() {
  return (
    <form className="w-full flex items-center justify-center gap-3 flex-col">
      <InputContainer>
        <Label>Pot Name</Label>
        <Input type="text" />
        <p className="self-end text-preset-5">30 characters left</p>
      </InputContainer>
      <InputContainer>
        <Label>Target</Label>
        <Input type="text" prefix={<FaDollarSign className="text-border" />} />
      </InputContainer>
      <InputContainer>
        <Label>Theme</Label>
        <Select>
          <SelectTrigger className="w-full bg-white text-navbar py-[22px] rounded-lg">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-white text-navbar">
            {colors.map((color) => (
              <SelectItem value={color} key={color}>
                <div className="flex items-center justify-start gap-3">
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
        Add Pot
      </Button>
    </form>
  );
}
