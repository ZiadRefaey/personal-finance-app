import { supabase } from "@/app/_lib/supabase";
export async function getUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function createUser(email: string, fullName: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, fullName }])
    .select();
  if (error) {
    return false;
  }
  return data;
}
export async function readBudgets(userID: number | undefined) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("userID", userID);
  if (error) throw new Error(error.message);
  return data;
}
export async function createBudget(
  userID: number | undefined,
  budgetName: null | FormDataEntryValue,
  color: null | FormDataEntryValue,
  max: null | FormDataEntryValue
) {
  const budgets = await readBudgets(userID);
  const exists = budgets.some((budget) => budget.name === budgetName);
  if (exists) throw new Error("this budget already exists");
  const { data, error } = await supabase
    .from("budgets")
    .insert([{ userID, name: budgetName, color, maximum: max }])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteBudget(budgetID: number) {
  const { error } = await supabase.from("budgets").delete().eq("id", budgetID);
  return error;
}
