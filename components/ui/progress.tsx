"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type CustomProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  indicatorClass?: string;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorClass, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-background dark:bg-background",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1  transition-all ${indicatorClass}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {/* <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1  transition-all bg-${secondarycolor} dark:bg-${secondarycolor} ${progressclassname}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    /> */}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
