import { getTransactions, getVendors, readBudgets } from "../_lib/data-service";
import { auth } from "@/auth";
import TransactionsDashboard from "../_components/TransactionsDashboard";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const budgets = await readBudgets(userId);
  const categories = budgets.map((budget) => budget.name);
  const vendors = await getVendors(userId);
  const vendorsNames = vendors.map((vendor) => vendor.name);
  const transactions = await getTransactions(userId);
  return (
    <>
      <TransactionsDashboard
        categories={categories}
        vendorsNames={vendorsNames}
        transactions={transactions}
      />
    </>
  );
}
