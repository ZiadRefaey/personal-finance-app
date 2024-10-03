import { ReactNode } from "react";

type CardType = {
  children: ReactNode;
  className?: string;
};
export default function Card({ children, className }: CardType) {
  return (
    <div
      className={`${className} rounded-xl py-6 px-5 md:p-8 bg-card-back-ground`}
    >
      {children}
    </div>
  );
}
