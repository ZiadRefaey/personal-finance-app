"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3 text-navbar", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center justify-between absolute inset-x-1 top-1",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-md border border-slate-200 bg-white text-navbar transition-colors hover:bg-slate-100 disabled:opacity-40",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-md border border-slate-200 bg-white text-navbar transition-colors hover:bg-slate-100 disabled:opacity-40",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "w-9 rounded-md text-[0.8rem] font-normal text-slate-500",
        week: "mt-2 flex w-full",
        day: "relative size-9 p-0 text-center text-sm",
        day_button:
          "size-9 rounded-md p-0 font-normal transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green",
        selected:
          "[&>button]:bg-green [&>button]:text-white [&>button]:hover:bg-green",
        today: "[&>button]:border [&>button]:border-green",
        outside: "text-slate-400 opacity-50",
        disabled: "text-slate-300 opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
