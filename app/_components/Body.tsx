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
    <body
      className={`${theme} ${className} bg-background w-[100vw] h-[100vh] grid grid-cols-1 grid-rows-[1fr,52px] md:grid-rows-[1fr,74px] xl:grid-cols-[300px,1fr] xl:grid-rows-1`}
    >
      {children}
    </body>
  );
}
