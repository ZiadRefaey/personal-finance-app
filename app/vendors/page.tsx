import { auth } from "@/auth";
import VendorsDashboard from "../_components/VendorsDashboard";
import { getVendors } from "../_lib/data-service";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const vendors = await getVendors(userId);
  return (
    <>
      <VendorsDashboard vendors={vendors} />
    </>
  );
}
