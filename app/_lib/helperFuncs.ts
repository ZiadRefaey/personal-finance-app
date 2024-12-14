import { getTransactionsByBudgetId } from "./data-service";
import { BillType, BudgetAPIType } from "./types";

export function FormatNumber(number: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
export function getDaysUntil(date: string | number | Date): number {
  const today: any = new Date();
  const dueDate: any = new Date(date);
  const timeDiff = dueDate - today;
  const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysUntil;
}
export async function getBudgetsWithSpent(budgets: BudgetAPIType[]) {
  const budgetsWithSpent = await Promise.all(
    budgets.map(async (budget) => {
      const transactions = await getTransactionsByBudgetId(budget.id);
      const totalTransactions = transactions.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      return {
        ...budget, // spread the existing properties
        spent: totalTransactions, // add the new total property
      };
    })
  );
  return budgetsWithSpent;
}
//return details about bills
export function getBillsSummaryDetails(bills: BillType[]) {
  const NumberOfPaid = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "paid") return acc + 1;
    return acc;
  }, 0);
  const totalPaid = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "paid") return acc + Number(cur.amount);
    return acc;
  }, 0);
  const NumberOfUpcoming = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "upcoming") return acc + 1;
    return acc;
  }, 0);
  const totalUpcoming = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "upcoming") return acc + Number(cur.amount);
    return acc;
  }, 0);
  const NumberOfOverDue = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "over due") return acc + 1;
    return acc;
  }, 0);
  const totalOverDue = bills.reduce((acc: any, cur: BillType) => {
    if (cur.status === "over due") return acc + Number(cur.amount);
    return acc;
  }, 0);
  return {
    NumberOfPaid,
    totalOverDue,
    NumberOfOverDue,
    totalUpcoming,
    NumberOfUpcoming,
    totalPaid,
  };
}
export function setLocalStorage(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return null; // Return a default value when running on the server
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}
export function getLocalStorage(key: string) {
  if (typeof window === "undefined") {
    return null; // Return a default value when running on the server
  }
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
