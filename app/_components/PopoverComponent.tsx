import CaretRight from "@/public/icon-caret-right.svg";
import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
type PopoverType = {
  trigger: string;
  content: ReactNode | string;
};
export default function PopoverComponent({ trigger, content }: PopoverType) {
  return (
    <Popover>
      <PopoverTrigger className="text-preset-4 text-secondary">
        {trigger}
        <span className="ml-3 inline-flex ">
          <Image src={CaretRight} alt="Caret right icon" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="">{content}</PopoverContent>
    </Popover>
  );
}
