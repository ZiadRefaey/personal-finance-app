import React, { ReactNode } from "react";
type Button = {
  onClick?: () => void;
  children: ReactNode;
  primary?: boolean;
  className?: string;
};
export default function Button({
  onClick,
  children,
  className,
  primary = true,
}: Button) {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg p-4 transition-all duration-150  ${
        primary
          ? "bg-primary text-card-back-ground hover:bg-secondary"
          : "bg-background text-primary border-[1px] border-transparent hover:border-border hover:bg-inherit"
      }`}
    >
      {children}
    </button>
  );
}
