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
export type Bills = {
  id: number;
  image: string;
  title: string;
  date: string;
  amount: number;
  pay_day: number;
  status?: "paid" | "due" | "upcoming";
};
export type SortDirection = "asc" | "desc";

export type ColumnSort = {
  id: string;
  desc: boolean;
};
export type SortingState = ColumnSort[];
export type SortingTableState = {
  sorting: SortingState;
};
export type BillFormType = {
  vendor: string;
  amount: number;
  date: number;
};
export type BillEditableData = {
  amount?: number;
  pay_day?: number;
  status?: "paid" | "upcoming" | "due";
  vendorId?: number;
};
export type Transaction = {
  id: number;
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  deposite: boolean;
};
