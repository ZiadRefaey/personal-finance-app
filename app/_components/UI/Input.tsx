import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Input({
  className,
  prefix,
}: {
  className?: string;
  prefix?: ReactNode;
}) {
  if (prefix)
    return (
      <div
        className={`border border-border w-full rounded-lg py-3 px-5 text-navbar items-center justify-start flex gap-3 bg-white text-preset-4`}
      >
        <div className="text-border text-xl">{prefix}</div>
        <input className="w-full h-full outline-none" />
      </div>
    );
  return (
    <input
      className={cn(
        `border border-border w-full rounded-lg py-3 px-5 text-navbar outline-none text-preset-4`,
        className
      )}
    />
  );
}
