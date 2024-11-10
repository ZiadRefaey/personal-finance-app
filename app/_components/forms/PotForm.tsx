"use client";
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
import Button from "../UI/Button";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import { useForm } from "react-hook-form";
import { PotFormInput } from "@/app/_lib/types";
import InputError from "../UI/InputError";

export default function PotForm({
  action,
  formData,
  id,
  successMessage,
}: {
  action: (
    title: string,
    goal: number,
    color: string,
    id: number
  ) => Promise<void | string>;
  formData?: { title: string; goal: number; color: string };
  id: number;
  successMessage: string;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PotFormInput>({
    defaultValues: {
      title: formData?.title || "",
      goal: formData?.goal || undefined,
      color: formData?.color || undefined,
    },
  });
  const titleValue = watch("title");
  const maxCharacters = 30;
  const charactersLeft = maxCharacters - titleValue.length;
  const { setOpenModal } = useModal();

  async function clientAction(data: any) {
    const result = await action(data.title, data.goal, data.color, id);
    if (result) {
      toast({
        title: "Something went wrong",
        description: result,
      });
    } else {
      toast({ title: successMessage });
      reset();
      setOpenModal("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full flex items-center justify-center gap-3 flex-col"
    >
      <InputContainer>
        <Label>Pot Name</Label>
        <Input
          register={{
            ...register("title", {
              required: "This field is required.",
              maxLength: {
                value: 30,
                message: "Name cannot exceed 30 characters long.",
              },
            }),
          }}
          name="title"
          type="text"
        />
        <p
          className={`self-end text-preset-4 ${
            charactersLeft < 0 ? "text-red" : "text-primary"
          }`}
        >
          {charactersLeft} characters left
        </p>
        {errors.title && <InputError>{errors.title.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Target</Label>
        <Input
          name="goal"
          register={{
            ...register("goal", {
              required: "This field is required.",
              min: { value: 0.1, message: "Target should be higher than 0." },
            }),
          }}
          type="text"
          prefix={<FaDollarSign className="text-border" />}
        />
        {errors.goal && <InputError>{errors.goal.message}</InputError>}
      </InputContainer>
      <InputContainer>
        <Label>Theme</Label>
        <Select
          onValueChange={(value) => setValue("color", value)}
          name="color"
        >
          <SelectTrigger
            {...register("color", { required: "This field is required" })}
            className="w-full bg-white text-navbar py-[22px] rounded-lg"
          >
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
        {errors.color && <InputError>{errors.color.message}</InputError>}
      </InputContainer>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        {formData && isSubmitting
          ? "Updating..."
          : formData
          ? "Update Pot"
          : !formData && isSubmitting
          ? "Creating..."
          : "Create Pot"}
      </Button>
    </form>
  );
}
