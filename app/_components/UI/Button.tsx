import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
type buttonType = "button" | "submit" | "reset";
type Button = {
  onClick?: () => void;
  children: ReactNode;
  primary?: boolean;
  className?: string;
  type?: buttonType;
};
export default function Button({
  onClick,
  children,
  className,
  primary = true,
  type = "button",
}: Button) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        ` rounded-lg p-4 transition-all duration-150  ${
          primary
            ? "bg-primary text-card-back-ground hover:bg-secondary text-preset-4"
            : "bg-background text-primary border-[1px] border-transparent hover:border-border hover:bg-inherit text-preset-4"
        }`,
        className
      )}
    >
      {children}
    </button>
  );
}
