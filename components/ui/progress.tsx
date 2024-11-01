"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type CustomProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  indicatorClass?: string;
  indicatorColor?: string;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorClass, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden  rounded-full bg-background dark:bg-background ",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        `h-full w-full flex-1 relative transition-all `,
        indicatorClass
      )}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: `var(--${indicatorColor})`,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
