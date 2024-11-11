import { auth } from "@/auth";
import BudgetsOverview from "./_components/BudgetsOverview";
import OverviewStatsCardsList from "./_components/OverviewStatsCardsList";
import PotsOverview from "./_components/PotsOverview";
import RecurringBillsOverview from "./_components/RecurringBillsOverview";
import TransactionsOverview from "./_components/TransactionsOverview";
import { Modal, ModalTrigger, ModalWindow } from "./_components/Modal";
import OverviewForm from "./_components/forms/OverviewForm";
import { getUserDetails } from "./_lib/data-service";

export default async function Home() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const userData = await getUserDetails(userId);
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Overview</h1>
        <Modal>
          <ModalTrigger modalName="update-details">Modify Details</ModalTrigger>
          <ModalWindow
            header="Update Personal Details"
            modalName="update-details"
            description="Set your monthly income to update your balance on each month at the specified day. You can also directly update the balance. "
          >
            <OverviewForm />
          </ModalWindow>
        </Modal>
      </div>
      <OverviewStatsCardsList userData={userData} />
      <div className="w-full h-[561px] grid grid-cols-1 xl:grid-cols-[0.587fr,0.413fr] gap-6">
        <div className="w-full h-full flex flex-col gap-4 md:gap-6">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="w-full h-full flex flex-col gap-4 md:gap-6">
          <BudgetsOverview />
          <RecurringBillsOverview />
        </div>
      </div>
    </div>
  );
}
