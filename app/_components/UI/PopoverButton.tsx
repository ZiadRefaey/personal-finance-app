import React, { ReactNode } from "react";

export default function PopoverButton({
  children,
  className,
  hover,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-lg ${
        hover ? hover : "hover:bg-slate-300"
      } transition-all duration-150 cursor-pointer`}
    >
      {children}
    </button>
  );
}
