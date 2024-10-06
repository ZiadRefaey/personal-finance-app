import React from "react";
import Button from "../_components/Button";
import BudgetCardsList from "../_components/BudgetCardsList";

export default function page() {
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between mb-[42px]">
        <h1 className="text-preset-1 text-primary">Budgets</h1>
        <Button>+Add New Budget</Button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[428px,1fr] gap-6">
        {/* place holder for spending summary */}
        <div className="w-full rounded-xl bg-card-back-ground h-[583px] md:h-[344px] xl:h-[599px]"></div>
        <BudgetCardsList />
      </div>
    </div>
  );
}
