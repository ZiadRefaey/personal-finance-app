"use client";
import React from "react";
import Button from "../UI/Button";
import { CreateNewVendor } from "@/app/_lib/actions";
import { Input as ShadcnInput } from "@/components/ui/input";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";

export default function NewVendorForm() {
  const { setOpenModal } = useModal();
  async function clientAction(formData: FormData) {
    const result = await CreateNewVendor(formData);
    if (result) {
      toast({ title: "Something went wrong.", description: result });
    } else {
      toast({ title: "Vender created successfully" });
      setOpenModal("");
    }
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
