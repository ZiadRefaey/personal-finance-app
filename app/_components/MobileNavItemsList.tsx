import React from "react";
import MobileNavItem from "./MobileNavItem";
import { NavLinks } from "../_lib/constants";
import { motion } from "framer-motion";
export default function MobileNavItemsList({
  isOpen,
  pathname,
  setIsOpen,
}: {
  setIsOpen: any;
  isOpen: boolean;
  pathname: string;
}) {
  return (
    <ul className=" flex items-start px-8 justify-start py-10 flex-col gap-4 w-full h-full">
      {NavLinks.map((navLink, index) => (
        <motion.li
          className=" w-[170px]"
          onClick={() => setIsOpen(false)}
          key={index}
          variants={{
            open: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.3 + index * 0.1, duration: 0.1 },
            },
            close: {
              opacity: 0,
              y: 15,
              transition: { delay: index * 0.07, duration: 0.05 },
            },
          }}
          animate={isOpen ? "open" : "close"}
        >
          <MobileNavItem
            label={navLink.label}
            href={navLink.href}
            icon={navLink.icon}
            pathname={pathname}
          />
        </motion.li>
      ))}
    </ul>
  );
}
