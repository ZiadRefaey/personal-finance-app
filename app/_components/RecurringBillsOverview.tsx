import Card from "./UI/Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import { authenticateAndGetUserId, getBills } from "../_lib/data-service";
import { FormatNumber, getBillsSummaryDetails } from "../_lib/helperFuncs";
import { BillType } from "../_lib/types";
type BillCardType = {
  billTitle: string;
  billAmount: number;
  borderColor: string;
};
type BillDataType = BillCardType[];

export default async function RecurringBillsOverview() {
  const userId = await authenticateAndGetUserId();
  const bills: BillType[] = await getBills(userId);
  const { totalOverDue, totalPaid, totalUpcoming } =
    getBillsSummaryDetails(bills);
  const BillsData: BillDataType = [
    {
      billTitle: "Paid Bills",
      billAmount: totalPaid,
      borderColor: "border-l-green",
    },
    {
      billTitle: "Total Upcoming",
      billAmount: totalUpcoming,
      borderColor: "border-l-yellow",
    },
    {
      billTitle: "Over Due",
      billAmount: totalOverDue,
      borderColor: "border-l-red",
    },
  ];
  return (
    <Card className="mb-6 md:mb-8">
      <OverviewSectionHeader
        title="Recurring Bills"
        buttonContent="See Details"
        href="/recurring-bills"
      />

      <div className="flex flex-col gap-3 mt-8">
        {BillsData.map((bill) => (
          <BillCard
            billAmount={bill.billAmount}
            billTitle={bill.billTitle}
            borderColor={bill.borderColor}
            key={bill.billTitle}
          />
        ))}
      </div>
    </Card>
  );
}
function BillCard({ borderColor, billTitle, billAmount }: BillCardType) {
  return (
    <div
      className={`flex items-center justify-between py-5 px-4 ${borderColor} border-l-4 bg-background rounded-lg`}
    >
      <p className="text-secondary text-preset-4">{billTitle}</p>
      <p className="text-preset-4-bold text-primary">
        ${FormatNumber(billAmount)}
      </p>
    </div>
  );
}
