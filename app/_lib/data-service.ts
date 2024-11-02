import { supabase } from "@/app/_lib/supabase";
import { auth } from "@/auth";
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

export async function readPots(userID: number) {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userID", userID);

  if (error) throw new Error(error.message);
  return data;
}

export async function createPot(
  userID: number,
  title: FormDataEntryValue | null,
  color: FormDataEntryValue | null,
  goal: FormDataEntryValue | null
) {
  //getting the user ID
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //retrieving all the users Pots for validation
  const pots = await readPots(userID);
  // checking if the user has a pot with the same title
  const potExists = pots.some((pot) => pot.title === title);
  if (potExists) throw new Error("This pot already exists.");

  //checking if the user has a pot with the same color
  const colorExists = pots.some((pot) => pot.color === color);
  if (colorExists) throw new Error("This color already exists.");

  //creating a pot with the input data
  const { data, error } = await supabase
    .from("pots")
    .insert([{ userID, color, goal, title, saved: 0 }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

//deleting a pot using ID
export async function deletePot(potID: number) {
  const { error } = await supabase.from("pots").delete().eq("id", potID);
  return error;
}

export async function updatePotSaved(potID: number, saved: number) {
  if (saved < 0) throw new Error("The result must be more than 0");
  const { data, error } = await supabase
    .from("pots")
    .update({ saved })
    .eq("id", potID)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
