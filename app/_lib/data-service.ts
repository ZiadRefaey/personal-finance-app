import { supabase } from "@/app/_lib/supabase";
import { auth } from "@/auth";
import { BillEditableData, userEditableData } from "./types";
export async function getUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}
export async function getUserDetails(id: number) {
  const { data } = await supabase
    .from("users")
    .select("income,balance,theme,incomeDay")
    .eq("id", id)
    .single();
  return data;
}
export async function createUser(email: string, fullName: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, fullName }])
    .select();
  if (error) throw new Error(error.message);

  return data;
}
export async function updateUser(id: number, updatedData: userEditableData) {
  const { data, error } = await supabase
    .from("users")
    .update({ ...updatedData })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
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
function serverSideValidateBudget(
  name: string,
  maximum: number,
  color: string
) {
  if (name.length < 2)
    throw new Error("Name must be atleast 2 characters long");
  if (!name || name === "") throw new Error("Name field is required");
  if (maximum < 1) throw new Error("Maximum must be larget than 1");
  if (!color || color === "") throw new Error("Color field is required.");
}
export async function createBudget(
  userId: number | undefined,
  name: string,
  maximum: number,
  color: string
) {
  //Authentication
  //Make sure the user is logged in
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  serverSideValidateBudget(name, maximum, color);
  const userBudgets = await getBudgets(userId);

  const budgetExists = userBudgets.some((budget) => budget.name === name);
  if (budgetExists) throw new Error("this budget already exists");

  const colorExists = userBudgets.some((budget) => budget.color === color);
  if (colorExists) throw new Error("This color already exists.");

  const { data, error } = await supabase
    .from("budgets")
    .insert([{ userId, name, color, maximum }])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//updating a budget based on its ID
export async function updateBudget(
  budgetId: number,
  name: string,
  maximum: number,
  color: string
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  serverSideValidateBudget(name, maximum, color);
  const userBudgets = await getBudgets(Number(session.user?.id));
  const userBudget = await getBudget(budgetId);
  const exists = userBudgets.some((budget) => budget.id === budgetId);
  if (!exists) throw new Error("You are not authorized to edit this budget");

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
function ServerSideValidatePot(title: string, goal: number, color: string) {
  if (title === "") throw new Error("Name cannot be empty");
  if (title.length > 30)
    throw new Error("Name cannot exceed 30 characters long.");
  if (goal <= 0) throw new Error("Target should be higher than 0.");
  if (color === "" || color.length === 0) throw new Error("Must have a color");
}
export async function createPot(
  userId: number,
  title: string,
  color: string,
  goal: number
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

  //basic server side validaction
  ServerSideValidatePot(title, goal, color);

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
  title: string,
  color: string,
  goal: number
) {
  const session = await auth();
  const userPots = await getPots(Number(session?.user?.id));
  const exists = userPots.some((pot) => Number(pot.id) === Number(potId));
  if (!exists) throw new Error("You are not authorized to update this pot");

  ServerSideValidatePot(title, goal, color);
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
  if (saved < 0)
    throw new Error("You can't withdraw more than what is deposited");
  if (typeof saved !== "number") {
    throw new Error("Input is invalid.");
  }
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

export async function getBills(userId: number) {
  const { data, error } = await supabase
    .from("bills")
    .select("*,vendors(name,image)")
    .eq("userId", userId);
  if (error) throw new Error(error.message);
  return data;
}
//function for determening the next monthly payment
function getTargetDate(dayOfMonth: number) {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // Month is 0-based
  const currentYear = today.getFullYear();

  let targetMonth = currentMonth;
  let targetYear = currentYear;

  // If the given day is greater than today, move to the next month
  if (dayOfMonth < currentDay) {
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0; // Wrap to January
      targetYear += 1;
    }
  }

  const targetDate = new Date(targetYear, targetMonth, dayOfMonth);
  return targetDate;
}
function BillsValidation(payDay: number, amount: number) {
  if (payDay < 1 || payDay > 28)
    throw new Error("Salary day must be between the 1st and 28th");
  if (!payDay) throw new Error("Salary day is required.");
  if (!amount) throw new Error(`Bill's amount is required.`);
}
export async function createBill(
  userId: number,
  payDay: number,
  amount: number,
  vendorId: number
) {
  BillsValidation(payDay, amount);
  const due_date = getTargetDate(payDay);
  const userBills = await getBills(userId);
  const billExists = userBills.some((bill) => bill.vendorId === vendorId);
  if (billExists) throw new Error("This bill already exists");
  const { data, error } = await supabase
    .from("bills")
    .insert([{ userId, pay_day: payDay, amount, vendorId, due_date }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function payBill(id: number) {
  const { data, error } = await supabase
    .from("bills")
    .update({ status: "paid" })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  const userData = await getUserDetails(data.userId);
  const updatedBalance = userData?.balance - data.amount;
  await updateUser(data.userId, { balance: updatedBalance });
}

export async function updateBill(id: number, billData: BillEditableData) {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const userBills = await getBills(userId);
  const exists = userBills.some((bill) => bill.id === id);
  if (!exists) throw new Error("You are not authorized to edit this bill");
  const billExists = userBills.some(
    (bill) =>
      bill.vendorId === billData.vendorId &&
      userBills[0].vendorId !== billData.vendorId
  );
  if (billExists) throw new Error("this budget already exists");
  let due_date;
  if (billData.pay_day) due_date = getTargetDate(billData.pay_day);
  const { error } = await supabase
    .from("bills")
    .update({ ...billData, due_date })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
}
