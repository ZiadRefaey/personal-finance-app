import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

export function Pagination({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
export function PaginationItem({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `size-10 border-border rounded-lg border text-preset-4 text-primary flex items-center justify-center  transition-all duration-150 ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : " cursor-pointer hover:bg-primary hover:border-primary hover:text-card-back-ground"
        }`,
        className
      )}
    >
      {children}
    </button>
  );
}
export function PaginationNext() {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="hidden md:inline-flex">Next</span>
      <FaCaretRight className="inline-flex size-4" />
    </div>
  );
}
export function PaginationPrev() {
  return (
    <div className="flex items-center justify-center gap-1">
      <FaCaretLeft className="inline-flex size-4" />
      <span className="hidden md:inline-flex">Left</span>
    </div>
  );
}
