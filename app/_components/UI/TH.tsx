import { ReactNode } from "react";

export default function TH({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <th
      onClick={onClick}
      className={`${className} text-start text-preset-5 text-secondary p-4`}
    >
      {children}
    </th>
  );
}
