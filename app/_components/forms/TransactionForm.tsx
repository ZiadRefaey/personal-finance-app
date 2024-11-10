"use client";
import InputContainer from "../UI/InputContainer";
import { useForm } from "react-hook-form";
import Label from "../UI/Label";
import { TransactionFormInputs } from "@/app/_lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaDollarSign } from "react-icons/fa6";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { CreateTransaction } from "@/app/_lib/actions";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import InputError from "../UI/InputError";
type namesType = string[];
export default function TransactionForm({
  categories,
  vendorsNames,
  setTransactionData,
}: {
  categories: namesType;
  vendorsNames: namesType;
  setTransactionData: any;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInputs>();

  async function onSubmit(data: any) {
    try {
      const result = await CreateTransaction(
        data.vendor,
        data.amount,
        data.category
      );
      const transaction = {
        avatar: result[0].vendors.image,
        name: result[0].vendors.name,
        category: result[0].budgets.name,
        date: new Date(result[0].created_at),
        amount: result[0].amount,
        deposite: false,
      };
      setTransactionData((prev: any) => [
        ...prev,
        {
          ...transaction,
        },
      ]);
      toast({ title: "Transaction created successfuly" });
      reset();
      setOpenModal("");
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message });
    }
  }
  const { setOpenModal } = useModal();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // action={clientAction}
        className="w-full flex items-center justify-center gap-3 flex-col"
      >
        <InputContainer>
          <Label>Vendors</Label>
          <Select
            onValueChange={(value) => {
              setValue("vendor", value);
              clearErrors("vendor");
            }}
            name="vendor"
          >
            <SelectTrigger
              {...register("vendor", { required: "This field is required." })}
              className="w-full bg-white text-navbar py-[22px] rounded-lg"
            >
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent className="bg-white text-navbar">
              {vendorsNames.map((vendorName) => (
                <SelectItem value={vendorName} key={vendorName}>
                  <p className="text-preset-4 capitalize">{vendorName}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.vendor && <InputError>{errors.vendor.message}</InputError>}
        </InputContainer>

        <InputContainer>
          <Label>Amount</Label>
          <Input
            register={register("amount", {
              required: "This field is required.",
              min: { value: 1, message: "Cannot be less that 1" },
            })}
            name="amount"
            type="number"
            prefix={<FaDollarSign className="text-border" />}
          />
          {errors.amount && <InputError>{errors.amount.message}</InputError>}
        </InputContainer>

        <InputContainer>
          <Label>Category</Label>
          <Select
            onValueChange={(value) => {
              setValue("category", value);
              clearErrors("category");
            }}
            name="category"
          >
            <SelectTrigger
              {...register("category", { required: "This field is required." })}
              className="w-full bg-white text-navbar py-[22px] rounded-lg"
            >
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
          {errors.category && (
            <InputError>{errors.category.message}</InputError>
          )}
        </InputContainer>

        <Submit isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
function Submit({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit Transaction"}
      </Button>
    </>
  );
}
