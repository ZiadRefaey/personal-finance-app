import Button from "../_components/Button";
import Card from "../_components/Card";
import TransactionTable from "../_components/TransactionTable";

export default function page() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-2 md:text-preset-1 text-primary">
          Transactions
        </h1>
        <Button>New Transaction</Button>
      </div>
      <Card className="w-full bg-card-back-ground min-h-[86vh] flex items-center justify-between flex-col">
        <TransactionTable />
      </Card>
    </>
  );
}
