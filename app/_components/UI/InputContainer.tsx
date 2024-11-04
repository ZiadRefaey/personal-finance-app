import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function InputContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `gap-1 flex flex-col w-full items-start justify-center`,
        className
      )}
    >
      {children}
    </div>
  );
}
