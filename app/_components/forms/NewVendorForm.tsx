"use client";
import React from "react";
import Button from "../UI/Button";
import { CreateNewVendor, UpdateVendor } from "@/app/_lib/actions";
import { Input as ShadcnInput } from "@/components/ui/input";
import InputContainer from "../UI/InputContainer";
import Label from "../UI/Label";
import Input from "../UI/Input";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { useForm } from "react-hook-form";
import { VendorFormInputs } from "@/app/_lib/types";
import InputError from "../UI/InputError";

export default function NewVendorForm({
  existingFormData,
  id,
}: {
  existingFormData?: string;
  id?: number;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendorFormInputs>({
    defaultValues: {
      name: existingFormData ? existingFormData : "",
    },
  });
  const { setOpenModal } = useModal();
  async function clientAction(data: VendorFormInputs) {
    // try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data?.image[0]);
    //if there are existing data then its an edit form
    if (existingFormData && id) {
      await UpdateVendor(id, formData);
    } else {
      console.log("create");
      await CreateNewVendor(formData);
    }
    toast({ title: "Vendor created successfully" });
    reset();
    setOpenModal("");
    // } catch (error: any) {
    //   toast({ title: "Something went wrong.", description: error.message });
    // }
  }

  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Name</Label>
        <Input
          register={{
            ...register("name", {
              required: "This field is required.",
              minLength: {
                value: 2,
                message: "Name must be atleast 2 characters long",
              },
            }),
          }}
          name="name"
          type="text"
        />
        {errors.name && <InputError>{errors.name.message}</InputError>}
      </InputContainer>

      <InputContainer>
        <Label>Avatar</Label>
        <ShadcnInput
          {...register("image", {
            // validate: {
            //   required: (value) =>
            //     (value instanceof FileList && value.length > 0) ||
            //     "This field is required",
            // },
          })}
          type="file"
          name="image"
        />
        {errors.image && <InputError>{errors.image.message}</InputError>}
      </InputContainer>

      <Button className="w-full mt-5" type="submit">
        {isSubmitting ? "Adding" : "Add New Vendor"}
      </Button>
    </form>
  );
}
