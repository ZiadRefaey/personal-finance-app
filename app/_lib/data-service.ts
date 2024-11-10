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
export async function getBudgets(userId: number | undefined) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}

async function getBudget(budgetId: number) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("id", budgetId);
  if (error) throw new Error(error.message);
  return data;
}

export async function createBudget(
  userId: number | undefined,
  budgetName: null | FormDataEntryValue,
  color: null | FormDataEntryValue,
  max: null | FormDataEntryValue
) {
  //Authentication
  //Make sure the user is logged in
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userBudgets = await getBudgets(userId);

  const budgetExists = userBudgets.some((budget) => budget.name === budgetName);
  if (budgetExists) throw new Error("this budget already exists");

  const colorExists = userBudgets.some((budget) => budget.color === color);
  if (colorExists) throw new Error("This color already exists.");

  const { data, error } = await supabase
    .from("budgets")
    .insert([{ userId, name: budgetName, color, maximum: max }])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//updating a budget based on its ID
export async function updateBudget(
  budgetId: number,
  name: null | FormDataEntryValue,
  color: null | FormDataEntryValue,
  maximum: null | FormDataEntryValue
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userBudgets = await getBudgets(Number(session.user?.id));
  const userBudget = await getBudget(budgetId);
  const exists = userBudgets.some((budget) => budget.id === budgetId);
  if (!exists) throw new Error("You are not authorized to delete this budget");

  //checks if the name exists in all budgets except for the current budget (if the user changes other values but leaves the budget name)
  const budgetExists = userBudgets.some(
    (budget) => budget.name === name && userBudget[0].name !== name
  );
  if (budgetExists) throw new Error("this budget already exists");

  //checks if the color exists in all budgets except for the current budget (if the user changes other values but leaves the budget color)
  const colorExists = userBudgets.some(
    (budget) => budget.color === color && userBudget[0].color !== color
  );
  if (colorExists) throw new Error("This color already exists.");

  const { error } = await supabase
    .from("budgets")
    .update({ name, color, maximum })
    .eq("id", budgetId);
  if (error) throw new Error(error.message);
}

export async function deleteBudget(budgetId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userBudgets = await getBudgets(Number(session.user?.id));
  const exists = userBudgets.some((budget) => budget.id === budgetId);
  if (!exists) throw new Error("You are not authorized to delete this budget");

  const { error: transactionsError } = await supabase
    .from("transactions")
    .delete()
    .eq("budgetId", budgetId);
  const { error } = await supabase.from("budgets").delete().eq("id", budgetId);
  if (transactionsError) throw new Error(transactionsError.message);
  if (error) throw new Error(error.message);
}

export async function getPots(userId: number) {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", userId);

  if (error) throw new Error(error.message);
  return data;
}

export async function createPot(
  userId: number,
  title: FormDataEntryValue | null,
  color: FormDataEntryValue | null,
  goal: FormDataEntryValue | null
) {
  //Authentication
  //getting the user ID
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //retrieving all the users Pots for validation
  const pots = await getPots(userId);
  // checking if the user has a pot with the same title
  const potExists = pots.some((pot) => pot.title === title);
  if (potExists) throw new Error("This pot already exists.");

  //checking if the user has a pot with the same color
  const colorExists = pots.some((pot) => pot.color === color);
  if (colorExists) throw new Error("This color already exists.");

  //creating a pot with the input data
  const { data, error } = await supabase
    .from("pots")
    .insert([{ userId, color, goal, title, saved: 0 }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

//update a pot using ID
export async function updatePot(
  potId: number,
  title: FormDataEntryValue | null,
  color: FormDataEntryValue | null,
  goal: FormDataEntryValue | null
) {
  const session = await auth();
  const userPots = await getPots(Number(session?.user?.id));
  const exists = userPots.some((pot) => Number(pot.id) === Number(potId));
  if (!exists) throw new Error("You are not authorized to update this pot");

  const { error } = await supabase
    .from("pots")
    .update({ title, color, goal })
    .eq("id", potId);
  if (error) throw new Error(error.message);
}

//deleting a pot using ID
export async function deletePot(potId: number) {
  const session = await auth();
  const userPots = await getPots(Number(session?.user?.id));
  const exists = userPots.some((pot) => Number(pot.id) === Number(potId));
  if (!exists) throw new Error("You are not authorized to delete this pot");

  const { error } = await supabase.from("pots").delete().eq("id", potId);
  if (error) throw new Error(error.message);
}

export async function updatePotSaved(potId: number, saved: number) {
  if (saved < 0) throw new Error("The result must be more than 0");
  const { data, error } = await supabase
    .from("pots")
    .update({ saved })
    .eq("id", potId)
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
  amount: number,
  budgetId: number,
  vendorId: number,
  userId: number,
  spent: number
): Promise<any> {
  const { data: transactionData, error: transactionError } = await supabase
    .from("transactions")
    .insert([{ amount, budgetId, vendorId, userId }])
    .select(`amount,created_at,budgets(name),vendors(name,image)`);
  const { error: budgetError } = await supabase
    .from("budgets")
    .update({ spent })
    .eq("id", budgetId)
    .select();
  if (transactionError) throw new Error(transactionError.message);
  if (budgetError) throw new Error(budgetError.message);
  return transactionData;
}

export async function getBudgetTransactions(userId: number, budgetId: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      ` amount, created_at,
     vendors(name,image)
    `
    )
    .eq("budgetId", budgetId)
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}
export async function getBudgetsTransactions(userId: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      ` amount, created_at,
     vendors(name,image),
     budgets(name,color,maximum)
    `
    )
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}
export async function updateBudgetSpent(budgetId: number, spent: number) {
  const { data, error } = await supabase
    .from("budgets")
    .update({ spent })
    .eq("id", budgetId)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
