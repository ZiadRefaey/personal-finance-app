import React, { ReactNode } from "react";

export default function PopoverButton({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg hover:bg-slate-300 transition-all duration-150">
      {children}
    </div>
  );
}
