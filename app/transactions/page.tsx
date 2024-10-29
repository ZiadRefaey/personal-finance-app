import Button from "../_components/Button";
import Card from "../_components/Card";
import NewTransactionForm from "../_components/forms/NewTransactionForm";
import { Modal, ModalTrigger, ModalWindow } from "../_components/Modal";
import TransactionTable from "../_components/TransactionTable";

export default function page() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-2 md:text-preset-1 text-primary">
          Transactions
        </h1>
        <Modal>
          <ModalTrigger modalName="add-pot">+Add New Pot</ModalTrigger>
          <ModalWindow
            header="Add New Pot"
            modalName="add-pot"
            form={<NewTransactionForm />}
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          />
        </Modal>
      </div>
      <Card className="w-full bg-card-back-ground min-h-[86vh] flex items-center justify-between flex-col">
        <TransactionTable />
      </Card>
    </>
  );
}
