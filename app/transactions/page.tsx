import { getBudgets, getTransactions, getVendors } from "../_lib/data-service";
import { auth } from "@/auth";
import TransactionsDashboard from "../_components/TransactionsDashboard";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const budgets = await getBudgets(userId);
  const categories = budgets.map((budget) => budget.name);
  const vendors = await getVendors(userId);
  const vendorNames = vendors.map((vendor) => vendor.name);
  const transactions = await getTransactions(userId);
  return (
    <>
      <TransactionsDashboard
        categories={categories}
        vendorNames={vendorNames}
        transactions={transactions}
      />
    </>
  );
}
