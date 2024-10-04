import Card from "./Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
type BillType = {
  billTitle: string;
  billAmount: string;
  borderColor: string;
};
type BillDataType = BillType[];
const BillsData: BillDataType = [
  {
    billTitle: "Paid Bills",
    billAmount: "190.00",
    borderColor: "border-l-green",
  },
  {
    billTitle: "Total Upcoming",
    billAmount: "194.98",
    borderColor: "border-l-yellow",
  },
  {
    billTitle: "Due Soon",
    billAmount: "59.98",
    borderColor: "border-l-cyan",
  },
];
export default function RecurringBillsOverview() {
  return (
    <Card className="mb-6 md:mb-8">
      <OverviewSectionHeader
        title="Recurring Bills"
        popoverTitle="See Details"
        popoverContent={
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
              Click me
            </button>
          </div>
        }
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
function BillCard({ borderColor, billTitle, billAmount }: BillType) {
  return (
    <div
      className={`flex items-center justify-between py-5 px-4 ${borderColor} border-l-4 bg-background rounded-lg`}
    >
      <p className="text-secondary text-preset-4">{billTitle}</p>
      <p className="text-preset-4-bold text-primary">${billAmount}</p>
    </div>
  );
}
