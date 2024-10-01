"use client";

import { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
type ContextProps = {
  children: ReactNode;
  className: string;
};
export default function Body({ children, className }: ContextProps) {
  const { theme } = useTheme();
  return (
    <body className={`${theme} ${className} w-[100vw] h-[100vh]`}>
      {children}
    </body>
  );
}
