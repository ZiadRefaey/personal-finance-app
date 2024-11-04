"use client";
import React from "react";
import Button from "../Button";
import { CreateNewVendor } from "@/app/_lib/actions";
import { Input as ShadcnInput } from "@/components/ui/input";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";

export default function NewVendorForm() {
  async function clientAction(formData: FormData) {
    const result = await CreateNewVendor(formData);
    if (result) console.log(result);
  }

  return (
    <form
      action={clientAction}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Name</Label>
        <Input name="name" type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Avatar</Label>
        <ShadcnInput type="file" name="image" />
      </InputContainer>

      <Button className="w-full mt-5" type="submit">
        Add New Vendor
      </Button>
    </form>
  );
}
