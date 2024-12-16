import { auth } from "@/auth";
import BillsDashboard from "../_components/BillsDashboard";
import { getBills, getVendors } from "../_lib/data-service";
import TotalBillsCard from "../_components/TotalBillsCard";
import BillsSummaryCard from "../_components/BillsSummaryCard";
export const metadata = {
  title: "Recurring Bills",
  description:"Recurring bills page where you can view all your reucrring bills, check when they have to be paid and pay them once they are upcoming or overdue, you can also add new bills with specific dates."
};
export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const bills = await getBills(userId);
  const billsTableData = bills.map((bill) => ({
    id: bill.id,
    image: bill.vendors.image,
    title: bill.vendors.name,
    amount: bill.amount,
    status: bill.status,
    date: bill.due_date,
    pay_day: bill.pay_day,
  }));
  const totalBills = bills.reduce((acc, cur) => cur.amount + acc, 0);
  const vendors = await getVendors(userId);
  const vendorNames = vendors.map((vendor) => vendor.name);

  return (
    <BillsDashboard vendorNames={vendorNames} billsTableData={billsTableData}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 xl:grid-cols-1 self-start">
        <TotalBillsCard total={totalBills} />
        <BillsSummaryCard />
      </div>
    </BillsDashboard>
  );
}
