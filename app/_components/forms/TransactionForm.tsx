"use client";
import InputContainer from "../UI/InputContainer";
import { useForm } from "react-hook-form";
import Label from "../UI/Label";
import { Transaction, TransactionFormInputs } from "@/app/_lib/types";
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
import { CreateTransaction, UpdateTransaction } from "@/app/_lib/actions";
import { toast } from "@/hooks/use-toast";
import { useModal } from "../Modal";
import InputError from "../UI/InputError";
type namesType = string[];
export default function TransactionForm({
  transactionsData,
  categories,
  vendorNames,
  setTransactionData,
  formData,
}: {
  transactionsData?: Transaction[];
  categories: namesType;
  vendorNames: namesType;
  setTransactionData: any;
  formData?: { vendor: string; amount: number; budget: string; id: number };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInputs>({
    defaultValues: { amount: formData?.amount || undefined },
  });

  async function onSubmit(data: any) {
    try {
      if (formData) {
        const updatedTransactionData = await UpdateTransaction(
          data.vendor,
          data.amount,
          data.category,
          formData.id
        );

        const updatedTransactionsData = transactionsData?.map(
          (tableRow: Transaction) =>
            tableRow.id !== formData.id
              ? tableRow
              : {
                  id: updatedTransactionData.id,
                  avatar: updatedTransactionData.vendors.image,
                  name: updatedTransactionData.vendors.name,
                  category: updatedTransactionData.budgets.name,
                  date: new Date(updatedTransactionData.created_at),
                  amount: updatedTransactionData.amount,
                  deposite: false,
                }
        );
        setTransactionData(updatedTransactionsData);
        toast({ title: "Transaction updated successfuly" });
      } else {
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
      }
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
        className="w-full flex items-center justify-center gap-3 flex-col"
      >
        <InputContainer>
          <Label>Vendors</Label>
          <Select
            defaultValue={formData ? formData.vendor : undefined}
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
              {vendorNames.map((vendorName) => (
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
            defaultValue={formData ? formData.budget : undefined}
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

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full p-3 text-preset-4-bold text-card-back-ground mt-2"
        >
          {formData && isSubmitting
            ? "Updating..."
            : formData
            ? "Update Transaction"
            : !formData && isSubmitting
            ? "Submitting..."
            : "Submit Transaction"}
        </Button>
      </form>
    </>
  );
}
