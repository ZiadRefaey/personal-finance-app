import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export default function Input({
  className,
  prefix,
  type,
}: {
  className?: string;
  prefix?: ReactNode;
  type: HTMLInputTypeAttribute;
}) {
  if (prefix)
    return (
      <div
        className={`border border-border w-full rounded-lg py-3 px-5 text-navbar items-center justify-start flex gap-3 bg-white text-preset-4`}
      >
        <div className="text-border text-xl">{prefix}</div>
        <input type={type} className="w-full h-full outline-none text-navbar" />
      </div>
    );
  return (
    <input
      type={type}
      className={cn(
        `border border-border w-full rounded-lg py-3 px-5 text-navbar outline-none text-preset-4`,
        className
      )}
    />
  );
}
