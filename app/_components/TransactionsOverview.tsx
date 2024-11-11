import { auth } from "@/auth";
import { getTransactions } from "../_lib/data-service";
import TransactionsTableSummary from "./TransactionsTableSummary";

export default async function TransactionsOverview() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const transactions = await getTransactions(userId);
  const sortedTransactions = [...transactions]
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 8);
  return (
    <TransactionsTableSummary
      transactions={sortedTransactions}
      bg="primary"
      title="Transactions"
    />
  );
}
