import React from "react";
import Card from "./Card";
import OverviewSectionHeader from "./OverviewSectionHeader";
import BudgetSpendingSummaryDetails from "./BudgetSpendingSummaryDetails";
import { PieChartShad } from "./PieChartShad";

import Papa from "@/public/avatars/bytewise.jpg";
import Quebec from "@/public/avatars/urban-services-hub.jpg";
import Romeo from "@/public/avatars/nimbus-data-storage.jpg";
import Spark from "@/public/avatars/spark-electric-solutions.jpg";
import Rina from "@/public/avatars/rina-sato.jpg";
import Aqua from "@/public/avatars/aqua-flow-utilities.jpg";
import Savory from "@/public/avatars/savory-bites-bistro.jpg";
import Ethan from "@/public/avatars/ethan-clark.jpg";
import Ella from "@/public/avatars/ella-phillips.jpg";
import William from "@/public/avatars/william-harris.jpg";
import Serenity from "@/public/avatars/serenity-spa-and-wellness.jpg";

type SpendingType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: false;
}[];
type BudgetData = {
  title: string;
  total: number;
  spent: number;
  color: string;
  spendingSummary: SpendingType;
}[];

// Budget Cards dummy data
const BudgetsListData: BudgetData = [
  {
    title: "Entertainment",
    total: 50,
    spent: 15,
    color: "green",
    spendingSummary: [
      {
        name: "Papa Software",
        image: Papa,
        amount: "10.00",
        date: "16 Aug 2024",
        deposite: false,
      },
      {
        name: "Quebec Services",
        image: Quebec,
        amount: "5.00",
        date: "12 Aug 2024",
        deposite: false,
      },
      {
        name: "Romeo Cloud Service",
        image: Romeo,
        amount: "10.00",
        date: "30 July 2024",
        deposite: false,
      },
    ],
  },
  {
    title: "Bills",
    total: 750,
    spent: 250,
    color: "cyan",
    spendingSummary: [
      {
        name: "Spark Electric Solutions",
        image: Spark,
        amount: "100.00",
        date: "2 Aug 2024",
        deposite: false,
      },
      {
        name: "Rina Sato",
        image: Rina,
        amount: "50.00",
        date: "2 Aug 2024",
        deposite: false,
      },
      {
        name: "Aqua Flow Utilities",
        image: Aqua,
        amount: "100.00",
        date: "30 July 2024",
        deposite: false,
      },
    ],
  },
  {
    title: "Dining Out",
    total: 75,
    spent: 133.75,
    color: "yellow",
    spendingSummary: [
      {
        name: "Savory Bites Bistro",
        image: Savory,
        amount: "55.50",
        date: "19 Aug 2024",
        deposite: false,
      },
      {
        name: "Ethan Clark",
        image: Ethan,
        amount: "32.50",
        date: "20 Aug 2024",
        deposite: false,
      },
      {
        name: "Ella Phillips",
        image: Ella,
        amount: "45.00",
        date: "10 Aug 2024",
        deposite: false,
      },
    ],
  },
  {
    title: "Personal Care",
    total: 100,
    spent: 40,
    color: "navy",
    spendingSummary: [
      {
        name: "William Harris",
        image: William,
        amount: "10.00",
        date: "5 Aug 2024",
        deposite: false,
      },
      {
        name: "Serenity Spa & Wellness",
        image: Serenity,
        amount: "30.00",
        date: "3 Aug 2024",
        deposite: false,
      },
      {
        name: "Serenity Spa & Wellness",
        image: Serenity,
        amount: "30.00",
        date: "3 July 2024",
        deposite: false,
      },
    ],
  },
];
export default function BudgetsOverview() {
  return (
    <Card>
      <OverviewSectionHeader
        title="Budgets"
        popoverTitle="See Details"
        popoverContent={
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="py-2 px-4 cursor-pointer hover:bg-slate-200">
              Click me
            </button>
          </div>
        }
      />
      <div className="flex items-center justify-center flex-col">
        <PieChartShad data={BudgetsListData} />
        <BudgetSpendingSummaryDetails data={BudgetsListData} />
      </div>
    </Card>
  );
}
