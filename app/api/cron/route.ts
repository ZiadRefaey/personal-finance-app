import { getDaysUntil } from "@/app/_lib/helperFuncs";
import { supabase } from "@/app/_lib/supabase";
async function getUsers() {
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .eq("incomeDay", new Date().getDate());
  return { users, usersError };
}
async function updateBalance(userId: number, newBalance: number) {
  const { error } = await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);
  return error;
}
async function getBills() {
  const { data, error } = await supabase.from("bills").select("*");
  return { data, error };
}
async function updateBillStatus(
  billId: number,
  status: "paid" | "upcoming" | "over due"
) {
  const { error } = await supabase
    .from("bills")
    .update({ status })
    .eq("id", billId);
  return error;
}
export async function POST() {
  const { users, usersError } = await getUsers();
  if (usersError) {
    return new Response("Error fetching users", { status: 500 });
  }

  if (users?.length) {
    users.map(async (user) => {
      const newBalance = user.balance + user.income;
      const updateBalanceError = await updateBalance(user.id, newBalance);
      if (updateBalanceError)
        return new Response("Error updating users", { status: 500 });
    });
  }
  const { data: bills, error: billsError } = await getBills();
  if (billsError) return new Response("Error fetching bills", { status: 500 });
  bills?.map(async (bill: any) => {
    // console.log("bill Id", bill.id);
    const daysUntil = getDaysUntil(bill.due_date);
    //if the the days on the upcoming bill is 3 or less change it to due
    if (daysUntil < 4) {
      const errorStatusUpdate = await updateBillStatus(bill.id, "upcoming");
      if (errorStatusUpdate)
        return new Response("Error updating status", { status: 500 });
    }

    //if the the bill date has passed changed it to over due
    if (daysUntil < 0) {
      const errorStatusUpdate = await updateBillStatus(bill.id, "over due");
      if (errorStatusUpdate)
        return new Response("Error updating status", { status: 500 });
    }
  });
  return new Response("Cron job executed", { status: 200 });
}
