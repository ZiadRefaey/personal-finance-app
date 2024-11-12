export type TransactionFormInputs = {
  amount: number;
  vendor: string;
  category: string;
};
export type PotOperationInput = {
  amount: number;
};
export type PotFormInput = {
  title: string;
  goal: number;
  color: string;
};
export type BudgetFormInputs = {
  title: string;
  amount: number;
  color: string;
};
export type VendorFormInputs = {
  name: string;
  image: FileList;
};
export type UserDetailsForm = {
  balance: number;
  income: number;
  incomeDay: number;
};
export type userData = {
  balance: number;
  income: number;
  incomeDay: number;
  theme: string;
} | null;
export type userEditableData = {
  balance?: number;
  income?: number;
  incomeDay?: number;
  theme?: string;
};
