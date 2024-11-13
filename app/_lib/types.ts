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
// Change after getting rid of static data
export type Bills = {
  // image: string;
  // title: string;
  // date: string;
  // amount: number;
  // status?: "paid" | "due" | "overdue";
  deposite: boolean;
  category: string;
  name: string;
  avatar: string;
  date: string;
  amount: number;
};
