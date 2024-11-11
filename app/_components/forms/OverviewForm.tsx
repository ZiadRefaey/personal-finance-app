import React from "react";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function OverviewForm() {
  return (
    <form className="w-full flex items-center justify-center flex-col gap-4">
      <InputContainer>
        <Label>Current Balance</Label>
        <Input name="blanace" type="number" />
      </InputContainer>
      <InputContainer>
        <Label>Income</Label>
        <Input name="income" type="number" />
      </InputContainer>
      <InputContainer>
        <Label>Day of income</Label>
        <Input name="income-day" type="number" />
      </InputContainer>
      <Button className="w-full mt-5" type="submit">
        Edit Details
      </Button>
    </form>
  );
}
