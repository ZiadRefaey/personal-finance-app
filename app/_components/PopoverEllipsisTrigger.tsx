import Ellipsis from "@/public/icon-ellipsis.svg";

import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
type PopoverType = {
  content: ReactNode | string;
};
export default function PopoverEllipsisTrigger({ content }: PopoverType) {
  return (
    <Popover>
      <PopoverTrigger className="p-2">
        <Image src={Ellipsis} alt="Popover Trigger Icon" />
      </PopoverTrigger>
      <PopoverContent className="">{content}</PopoverContent>
    </Popover>
  );
}
