import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary dark:bg-navbar",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
