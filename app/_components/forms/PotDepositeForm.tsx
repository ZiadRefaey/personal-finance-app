import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { FaDollarSign } from "react-icons/fa6";
import Button from "../Button";

export default function PotDepositeForm() {
  return (
    <form className="flex flex-col items-center justify-center gap-5 w-full">
      <InputContainer>
        <Label>Amount to Add</Label>
        <Input
          name="amount"
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
      </InputContainer>
      <Button type="submit" className="w-full">
        Confirm Addition
      </Button>
    </form>
  );
}
