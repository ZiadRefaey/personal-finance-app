import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message: string;
  icon?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  message,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`w-full min-h-[280px] rounded-xl border border-dashed border-border bg-background px-6 py-10 flex flex-col items-center justify-center text-center ${className}`}
    >
      {icon && (
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-card-back-ground text-green">
          {icon}
        </div>
      )}
      <h2 className="text-preset-2 text-primary mb-3">{title}</h2>
      <p className="max-w-[420px] text-preset-4 text-secondary">{message}</p>
    </div>
  );
}
