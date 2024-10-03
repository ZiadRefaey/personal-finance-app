"use client";
import NavItem from "./NavItem";
import { GoHomeFill } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import { BiSolidPieChartAlt2, BiArrowFromRight } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { PiReceiptFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { useRetractable } from "./RetractableProvider";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const NavIconStyling = `size-6`;
  const { theme, setTheme } = useTheme();
  const NavLinks = [
    {
      icon: <GoHomeFill className={NavIconStyling} />,
      label: "Overview",
    },
    {
      icon: <LuArrowUpDown className={NavIconStyling} />,
      label: "Transactions",
    },
    {
      icon: <BiSolidPieChartAlt2 className={NavIconStyling} />,
      label: "Budgets",
    },
    {
      icon: <FaSackDollar className={NavIconStyling} />,
      label: "Pots",
    },
    {
      icon: <PiReceiptFill className={NavIconStyling} />,
      label: "Recurring bills",
    },
  ];
  const { isRetracted, setIsRetracted } = useRetractable();
  return (
    <motion.nav
      className="bg-navbar order-2 xl:order-1 w-full h-full rounded-t-lg xl:rounded-tl-none xl:rounded-r-2xl px-4 pt-2 pb-0 xl:pl-0 xl:pr-6 xl:py-10 xl:flex xl:flex-col xl:items-start xl:justify-between "
      layout
    >
      <div className="w-full">
        <div className="hidden xl:block pl-8 mb-[64px] self-start">
          <Logo isLogoLarge={!isRetracted} />
        </div>
        <ul className="flex items-center justify-between pb-0 h-full p-0 xl:flex-col xl:justify-center xl:gap-1">
          {NavLinks.map((link) => (
            <NavItem
              key={link.label}
              icon={link.icon}
              label={link.label}
              pathname={pathname}
              isRetracted={isRetracted}
            />
          ))}
        </ul>
      </div>
      <div className="hidden xl:block w-full px-8  text-preset-3 text-icon">
        <div
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="cursor-pointer transition-all duration-150 hover:text-seperator flex gap-4"
        >
          <motion.div layout>
            {theme === "light" ? (
              <MdDarkMode className="size-6" />
            ) : (
              <MdLightMode className="size-6 " />
            )}
          </motion.div>
          {!isRetracted && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Switch to {theme === "light" ? "dark" : "light"}
            </motion.span>
          )}
        </div>
        <motion.button
          layout
          onClick={() => {
            setIsRetracted(!isRetracted);
          }}
          className="hidden xl:flex  gap-4  cursor-pointer py-4  transition-colors duration-150 hover:text-seperator"
        >
          <motion.div layout>
            <BiArrowFromRight
              className={`transition-transform duration-300 w-6 h-6 ${
                isRetracted ? "rotate-180" : ""
              }`}
            />
          </motion.div>
          {!isRetracted && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Minimize Menu
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}
