import React, { ReactNode } from "react";
type buttonType = "button" | "submit" | "reset";
type Button = {
  onClick?: () => void;
  children: ReactNode;
  primary?: boolean;
  className?: string;
  type?: buttonType;
  disabled?: boolean;
};
export default function Button({
  onClick,
  children,
  className,
  primary = true,
  type = "button",
  disabled,
}: Button) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${className} rounded-lg p-4 transition-all duration-150 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        primary
          ? "bg-primary text-background hover:bg-secondary text-preset-4"
          : "bg-background text-primary border-[1px] border-transparent hover:border-border hover:bg-inherit text-preset-4"
      }`}
    >
      {children}
    </button>
  );
}
