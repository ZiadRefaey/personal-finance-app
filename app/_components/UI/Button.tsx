import React, { ReactNode } from "react";
type buttonType = "button" | "submit" | "reset";
type Button = {
  onClick?: () => void;
  children: ReactNode;
  primary?: boolean;
  className?: string;
  type?: buttonType;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};
export default function Button({
  onClick,
  children,
  className,
  variant = "primary",
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
        variant == "primary"
          ? "bg-primary text-background hover:bg-secondary text-preset-4"
          : variant === "secondary"
          ? "bg-background text-primary border-[1px] border-transparent hover:border-border hover:bg-inherit text-preset-4"
          : variant === "danger"
          ? "bg-red text-white w-full hover:opacity-70"
          : ""
      }`}
    >
      {children}
    </button>
  );
}
