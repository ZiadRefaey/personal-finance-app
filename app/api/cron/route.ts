import { supabase } from "@/app/_lib/supabase";
export async function POST() {
  return await handleCronJob();
}

export async function GET() {
  return await handleCronJob(); // Allow GET for testing
}
export async function handleCronJob() {
  const today = new Date().getDate();
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("incomeDay", today);
  if (error) {
    console.log(error);
    return new Response("Error fetching users", { status: 500 });
  }

  if (users?.length) {
    users.map(async (user) => {
      const newBalance = user.balance + user.income;
      const { error: updateError } = await supabase
        .from("users")
        .update({ balance: newBalance })
        .eq("id", user.id);
      if (updateError)
        return new Response("Error updating users", { status: 500 });
    });

    return new Response("Cron job executed", { status: 200 });
  }
  return new Response("No users to update today", { status: 200 });
}
