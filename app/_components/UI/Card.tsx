import { ReactNode } from "react";

type CardType = {
  children: ReactNode;
  className?: string;
  bg?: "primary" | "secondary";
};
export default function Card({
  children,
  className,
  bg = "primary",
}: CardType) {
  return (
    <div
      className={`${className} rounded-xl py-6 px-5 md:p-8 ${
        bg === "primary"
          ? "bg-card-back-ground"
          : bg === "secondary"
          ? "bg-background"
          : ""
      }`}
    >
      {children}
    </div>
  );
}
