import { auth } from "@/auth";
import BillsDashboard from "../_components/BillsDashboard";
import { getBills, getVendors } from "../_lib/data-service";

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
    <BillsDashboard
      totalBills={totalBills}
      vendorNames={vendorNames}
      billsTableData={billsTableData}
    />
  );
}
