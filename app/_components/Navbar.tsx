"use client";
import NavItem from "./NavItem";
import { GoHomeFill } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { PiReceiptFill } from "react-icons/pi";
import { BiArrowFromRight } from "react-icons/bi";
import { usePathname } from "next/navigation";

import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const NavIconStyling = `w-6 h-6`;
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
  return (
    <nav className="bg-navbar order-2 xl:order-1 w-full h-full rounded-t-lg xl:rounded-tl-none xl:rounded-r-2xl px-4 pt-2 pb-0 xl:pl-0 xl:pr-6 xl:py-10 xl:flex xl:flex-col xl:items-start xl:justify-between ">
      <div className="w-full">
        <div className="hidden xl:block pl-8 mb-[64px] ">
          <Logo />
        </div>
        <ul className="flex items-center justify-between pb-0 h-full p-0 xl:flex-col xl:justify-center xl:gap-1">
          {NavLinks.map((link) => (
            <NavItem
              key={link.label}
              icon={link.icon}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </ul>
      </div>
      <button className="hidden xl:flex  gap-4 px-8 cursor-pointer py-4 text-preset-3 text-icon hover:text-seperator transition-all duration-150">
        <BiArrowFromRight className="w-6 h-6" />
        <p>Minimize Menu</p>
      </button>
    </nav>
  );
}
