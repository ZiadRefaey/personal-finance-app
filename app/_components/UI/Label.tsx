import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn(`text-preset-4-bold`, className)}>{children}</label>
  );
}
