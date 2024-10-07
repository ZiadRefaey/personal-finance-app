import React, { ReactNode } from "react";
import Card from "./Card";
import PopoverEllipsisTrigger from "./PopoverEllipsisTrigger";
import { Progress } from "@/components/ui/progress";
import Button from "./Button";
type PotType = {
  title: string;
  saved: string;
  percentage: number;
  target: number;
  color: string;
  popoverContent: ReactNode;
};
export default function PotCard({
  title,
  saved,
  percentage,
  target,
  color,
  popoverContent,
}: PotType) {
  return (
    <Card>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <div className={`size-4 rounded-full ${color}`}></div>
          <p className="text-preset-2 text-primary">{title}</p>
        </div>
        <PopoverEllipsisTrigger content={popoverContent} />
      </div>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-preset-4 text-secondary">Total Saved</p>
        <p className="text-preset-1 text-secondary self-start">${saved}</p>
      </div>
      {/* <Progress value={percentage} secondarycolor={color} className="h-2" /> */}
      <Progress
        value={percentage}
        className="h-2"
        indicatorClass={`${color}`}
      />
      <div className="flex items-center justify-between mt-[13px]">
        <p className="text-preset-5-bold text-secondary">{percentage}%</p>
        <p className="text-preset-5 text-secondary">Target of ${target}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 w-full gap-3">
        <Button primary={false}>+ Add Money</Button>
        <Button primary={false}>Withdraw</Button>
      </div>
    </Card>
  );
}
