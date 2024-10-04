import React, { ReactNode } from "react";
import PopoverComponent from "./PopoverComponent";
type SectionHeaderType = {
  title: string;
  popoverTitle: string;
  popoverContent: ReactNode;
};
export default function OverviewSectionHeader({
  title,
  popoverTitle,
  popoverContent,
}: SectionHeaderType) {
  return (
    <div className="flex items-center justify-between w-full mb-5">
      <p className="text-preset-2 text-primary">{title}</p>
      <PopoverComponent trigger={popoverTitle} content={popoverContent} />
    </div>
  );
}
