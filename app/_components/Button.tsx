import React, { ReactNode } from "react";
type Button = {
  onClick?: () => void;
  children: ReactNode;
};
export default function Button({ onClick, children }: Button) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-primary p-4 text-card-back-ground"
    >
      {children}
    </button>
  );
}
