import React, { ReactNode } from "react";

export default function InputError({ children }: { children: ReactNode }) {
  return <p className="text-red text-preset-3">{children}</p>;
}
