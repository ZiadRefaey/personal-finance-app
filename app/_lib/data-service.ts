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
  //Authentication
  //Make sure the user is logged in
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userBudgets = await readBudgets(userID);

  const budgetExists = userBudgets.some((budget) => budget.name === budgetName);
  if (budgetExists) throw new Error("this budget already exists");

  const colorExists = userBudgets.some((budget) => budget.color === color);
  if (colorExists) throw new Error("This color already exists.");

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
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userBudgets = await readBudgets(Number(session.user?.id));
  const exists = userBudgets.some((budget) => budget.id === budgetID);
  if (!exists) throw new Error("You are not authorized to delete this budget");

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
  //Authentication
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
  const session = await auth();
  const userPots = await readPots(Number(session?.user?.id));
  const exists = userPots.some((pot) => Number(pot.id) === Number(potID));
  if (!exists) throw new Error("You are not authorized to delete this pot");

  const { error } = await supabase.from("pots").delete().eq("id", potID);
  if (error) throw new Error(error.message);
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
export async function getVendors(userId: number) {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}
export async function createVendor(
  userId: number,
  name: FormDataEntryValue | null,
  image: string
) {
  const { data, error } = await supabase
    .from("vendors")
    .insert([{ userId, name, image }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function uploadFile(path: string, fileName: string, file: File) {
  const { data, error } = await supabase.storage
    .from(`avatars`)
    .upload(`${path}/${fileName}`, file);
  if (error) throw new Error(error.message);
  return data;
}

export async function getFileUrl(filepath: string) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(filepath);
  return data.publicUrl;
}

export async function getTransactions(userId: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `*,
      vendors (image,name),
      budgets(name)`
    )
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}
export async function getTransactionsWithVendors() {
  const { data, error } = await supabase.from("transactions").select(`
    *,
    vendors ( image,name ),
    budgets(name)
  `);
  if (error) throw new Error(error.message);
  return data;
}
export async function createTransaction(
  amount: FormDataEntryValue | null,
  budgetId: number,
  vendorId: number,
  userId: number
) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([{ amount, budgetId, vendorId, userId }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}
