import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
type NavItemProps = {
  icon: ReactNode;
  label: string;
  pathname: string;
  isRetracted: boolean;
  href: string;
};

export default function NavItem({
  icon,
  label,
  pathname,
  isRetracted,
  href,
}: NavItemProps) {
  return (
    <motion.li layout className={`w-full`}>
      <Link
        className={`group relative ${
          (pathname === "/" && label.toLowerCase() === "overview") ||
          pathname === "/" + label.toLowerCase().replace(" ", "-")
            ? " after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-green xl:after:h-full xl:after:w-[6px] xl:rounded-r-xl after:opacity-100 bg-background text-green"
            : "bg-inherit text-icon hover:text-seperator"
        }  ${
          isRetracted ? "" : "xl:flex-row  xl:pl-8 xl:gap-4"
        } pt-2 pb-3 px-[22px]  rounded-t-lg h-full xl:h-auto xl:w-full xl:rounded-tl-none  transition-all duration-300 flex flex-col items-center justify-start cursor-pointer gap-1 xl:py-4`}
        href={href}
      >
        <motion.div layout>{icon}</motion.div>
        {!isRetracted && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`sr-only md:not-sr-only text-preset-5-bold xl:text-preset-3 ${
              (pathname === "/" && label.toLowerCase() === "overview") ||
              pathname === "/" + label.toLowerCase()
                ? "text-primary"
                : ""
            } `}
          >
            {label}
          </motion.span>
        )}
      </Link>
    </motion.li>
  );
}
