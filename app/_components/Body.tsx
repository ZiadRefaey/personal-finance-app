"use client";

import { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { useRetractable } from "./RetractableProvider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
type ContextProps = {
  children: ReactNode;
  className: string;
};
export default function Body({ children, className }: ContextProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { isRetracted } = useRetractable();
  return (
    <motion.body
      layout
      className={`${theme} ${className} bg-background w-[100vw] h-[100vh] overflow-y-hidden overflow-x-hidden ${
        pathname === "/login"
          ? ``
          : `grid grid-cols-1 grid-rows-[1fr,52px] md:grid-rows-[1fr,74px] ${
              isRetracted
                ? "xl:grid-cols-[88px,1fr]"
                : "xl:grid-cols-[300px,1fr]"
            } xl:grid-rows-1`
      } `}
    >
      {children}
    </motion.body>
  );
}
