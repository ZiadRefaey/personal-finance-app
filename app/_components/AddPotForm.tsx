import React from "react";
import InputContainer from "./InputContainer";
import Label from "./Label";
import Input from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colors from "@/app/_lib/colors.json";
import Button from "../app/_components/Button";
export default function AddPotForm() {
  return (
    <form className="w-full flex items-center justify-center gap-3 flex-col">
      <InputContainer>
        <Label>Pot Name</Label>
        <input className="border border-border w-full rounded-lg py-3 px-5 text-navbar"></input>
        <p className="self-end text-preset-5">30 characters left</p>
      </InputContainer>
      <InputContainer>
        <Label>Pot Name</Label>
        <Input prefix={<></>} />
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
            ))}{" "}
          </SelectContent>
        </Select>
      </InputContainer>
      <Button className="w-full p-3 text-preset-4-bold text-card-back-ground">
        Add Pot
      </Button>
    </form>
  );
}
