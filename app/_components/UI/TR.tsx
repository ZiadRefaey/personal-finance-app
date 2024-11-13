import React, { ReactNode } from "react";

export default function TR({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`${className} grid grid-cols-[63%,1fr] grid-rows-2 md:table-row  text-secondary text-preset-5`}
    >
      {children}
    </tr>
  );
}
