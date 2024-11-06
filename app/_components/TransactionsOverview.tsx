import TransactionsTableSummary from "./TransactionsTableSummary";

const spendingSummary: any = [];
export default function TransactionsOverview() {
  return (
    <TransactionsTableSummary
      transactions={spendingSummary}
      bg="primary"
      title="Transactions"
    />
  );
}
