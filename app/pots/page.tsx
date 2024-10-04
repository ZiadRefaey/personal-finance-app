import React from "react";
import Button from "../_components/Button";

export default function page() {
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-preset-1 mb-[42px] text-primary">Pots</h1>
        <Button>+Add New Pot</Button>
      </div>
    </div>
  );
}
