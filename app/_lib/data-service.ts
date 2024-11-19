import { supabase } from "@/app/_lib/supabase";
import { auth } from "@/auth";
import { BillEditableData, userEditableData } from "./types";
import { getDaysUntil } from "./helperFuncs";
import { add } from "date-fns";
function validateDuplicateEntry<T>(
  existingData: T[],
  isDuplicate: (entry: T) => boolean,
  errorMessage: string
): void {
  const duplicateExists = existingData.some(isDuplicate);
  if (duplicateExists) throw new Error(errorMessage);
}
function checkOwnership<T>(
  existingData: T[],
  isOwned: (entry: T) => boolean,
  errorMessage: string
): void {
  const exists = existingData.some(isOwned);
  if (!exists) throw new Error(errorMessage);
}

export async function authenticateAndGetUserId() {
  const session = await auth();
  if (!session) throw new Error("User must be authenticated");
  const userId = Number(session?.user?.id);
  return userId;
}
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

export async function getBudget(budgetId: number) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("id", budgetId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
function validateBudgetFields(name: string, maximum: number, color: string) {
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
  await authenticateAndGetUserId();
  validateBudgetFields(name, maximum, color);
  const userBudgets = await getBudgets(userId);
  //check if the user has a budget with the same name
  validateDuplicateEntry(
    userBudgets,
    (budget) => budget.name === name,
    "This budget already exists"
  );
  //check if the user has a budget with the same color
  validateDuplicateEntry(
    userBudgets,
    (budget) => budget.color === color,
    "This color already exists"
  );

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
  const userId = await authenticateAndGetUserId();
  validateBudgetFields(name, maximum, color);
  const userBudgets = await getBudgets(userId);
  const userBudget = await getBudget(budgetId);
  //check if the updated budget belongs to the user
  checkOwnership(
    userBudgets,
    (budget) => budget.id === budgetId,
    "You are not authorized to edit this budget"
  );

  //checks if the name exists in all budgets except for the current budget (if the user changes other values but leaves the budget name)
  validateDuplicateEntry(
    userBudgets,
    (budget) => budget.name === name && userBudget.name !== name,
    "This budget already exists"
  );

  //checks if the color exists in all budgets except for the current budget (if the user changes other values but leaves the budget color)
  validateDuplicateEntry(
    userBudgets,
    (budget) => budget.color === color && userBudget.color !== color,
    "This color already exists"
  );

  const { error } = await supabase
    .from("budgets")
    .update({ name, color, maximum })
    .eq("id", budgetId);
  if (error) throw new Error(error.message);
}

export async function deleteBudget(budgetId: number) {
  const userId = await authenticateAndGetUserId();
  const userBudgets = await getBudgets(userId);
  //check if the updated budget belongs to the user
  checkOwnership(
    userBudgets,
    (budget) => budget.id === budgetId,
    "You are not authorized to delete this budget"
  );

  const { error: transactionsError } = await supabase
    .from("transactions")
    .delete()
    .eq("budgetId", budgetId);
  const { error } = await supabase.from("budgets").delete().eq("id", budgetId);
  if (transactionsError) throw new Error(transactionsError.message);
  if (error) throw new Error(error.message);
}

function validatePotsFields(title: string, goal: number, color: string) {
  if (title === "") throw new Error("Name cannot be empty");
  if (title.length > 30)
    throw new Error("Name cannot exceed 30 characters long.");
  if (goal <= 0) throw new Error("Target should be higher than 0.");
  if (color === "" || color.length === 0) throw new Error("Must have a color");
}

export async function getPots(userId: number) {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("userId", userId);

  if (error) throw new Error(error.message);
  return data;
}
export async function getPot(potId: number) {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("id", potId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createPot(
  userId: number,
  title: string,
  color: string,
  goal: number
) {
  //Authentication
  //getting the user ID
  await authenticateAndGetUserId();

  //retrieving all the users Pots for validation
  const userPots = await getPots(userId);
  // checking if the user has a pot with the same title
  validateDuplicateEntry(
    userPots,
    (pot) => pot.title === title,
    "This pot already exists"
  );

  //checking if the user has a pot with the same color
  validateDuplicateEntry(
    userPots,
    (pot) => pot.color === color,
    "This color already exists"
  );

  //basic server side validaction
  validatePotsFields(title, goal, color);

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
  try {
    const userId = await authenticateAndGetUserId();
    const userPots = await getPots(userId);
    const currentPot = await getPot(potId);

    //check if the updated pot belongs to the user
    checkOwnership(
      userPots,
      (pot) => pot.id === potId,
      "You are not authorized to edit this pot"
    );

    validatePotsFields(title, goal, color);
    //checks if the title exists in all pots except for the current pot (if the user changes other values but leaves the pot title)
    validateDuplicateEntry(
      userPots,
      (pot) => pot.title === title && currentPot.title !== title,
      "This pot already exists"
    );

    //checks if the pot color exists in all pots except for the current pot (if the user changes other values but leaves the pot color)
    validateDuplicateEntry(
      userPots,
      (pot) => pot.color === color && currentPot.color !== color,
      "This color already exists"
    );

    const { error } = await supabase
      .from("pots")
      .update({ title, color, goal })
      .eq("id", potId);
    if (error) throw new Error(error.message);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//deleting a pot using ID
export async function deletePot(potId: number) {
  const userId = await authenticateAndGetUserId();
  const userPots = await getPots(userId);
  //check if the updated pot belongs to the user
  checkOwnership(
    userPots,
    (pot) => pot.id === potId,
    "You are not authorized to delete this pot"
  );

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
export async function getVendor(vendorId: number) {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", vendorId)
    .single();
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
export async function getTransaction(transactionId: number) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `*,
      vendors (image,name),
      budgets(name)`
    )
    .eq("id", transactionId)
    .single();
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

export async function updateTransaction(
  transactionId: number,
  amount: number,
  vendorId: number,
  budgetId: number,
  spent: number
) {
  const { data, error: transactionError } = await supabase
    .from("transactions")
    .update({ amount, vendorId, budgetId })
    .eq("id", transactionId)
    .select("*,budgets(name),vendors(name,image)")
    .single();
  const { error: budgetError } = await supabase
    .from("budgets")
    .update({ spent })
    .eq("id", budgetId)
    .select();
  if (transactionError) throw new Error(transactionError.message);
  if (budgetError) throw new Error(budgetError.message);
  return data;
}

export async function deleteTransaction(transactionId: number) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);
  if (error) throw new Error(error.message);
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
export async function getBill(billId: number) {
  const { data, error } = await supabase
    .from("bills")
    .select("*")
    .eq("id", billId)
    .single();
  if (error) throw new Error(error.message);
  return data;
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
  const daysUntil = getDaysUntil(due_date);
  console.log(daysUntil);
  let status = "paid";
  if (daysUntil < 4) status = "upcoming";
  const userBills = await getBills(userId);
  validateDuplicateEntry(
    userBills,
    (bill) => bill.vendorId === vendorId,
    "This bill already exists"
  );

  const { data, error } = await supabase
    .from("bills")
    .insert([{ userId, pay_day: payDay, amount, vendorId, due_date, status }])
    .select("*,vendors(name,image)");
  if (error) throw new Error(error.message);
  return data;
}

export async function payBill(billId: number) {
  const currentBill = await getBill(billId);

  const oldDueDate = currentBill.due_date;
  const dueDate = add(oldDueDate, { months: 1 });

  const { data, error } = await supabase
    .from("bills")
    .update({ status: "paid", due_date: dueDate })
    .eq("id", billId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  const userData = await getUserDetails(data.userId);
  const updatedBalance = userData?.balance - data.amount;
  await updateUser(data.userId, { balance: updatedBalance });
}

export async function updateBill(id: number, billData: BillEditableData) {
  const userId = await authenticateAndGetUserId();
  const userBills = await getBills(userId);
  //checks if the updated bill belongs to the user
  checkOwnership(
    userBills,
    (bill) => bill.id === id,
    "You are not authorized to edit this bill"
  );
  //checks if there is another bill with the same name
  validateDuplicateEntry(
    userBills,
    (bill) =>
      bill.vendorId === billData.vendorId &&
      userBills[0].vendorId !== billData.vendorId,
    "this bill already exists"
  );

  let due_date;
  if (billData.pay_day) due_date = getTargetDate(billData.pay_day);
  const { data, error } = await supabase
    .from("bills")
    .update({ ...billData, due_date })
    .eq("id", id)
    .select("*,vendors(name,image)");
  if (error) throw new Error(error.message);
  return data;
}
export async function deleteBill(billId: number) {
  try {
    const userId = await authenticateAndGetUserId();
    const userBills = await getBills(userId);

    //checks if the bill belongs to the user
    checkOwnership(
      userBills,
      (bill) => bill.id === billId,
      "You are not authorized to delete this bill"
    );

    const { error } = await supabase.from("bills").delete().eq("id", billId);
    if (error) throw new Error(error.message);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
