"use client";
import { usePathname } from "next/navigation";
import { BiArrowFromRight } from "react-icons/bi";
import NavItem from "./NavItem";

import { motion } from "framer-motion";
import { NavLinks } from "../_lib/constants";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import NavbarAvatar from "./NavbarAvatar";
import { useRetractable } from "./RetractableProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import { SessionType } from "../_lib/types";
export default function Navbar({ session }: { session: any }) {
  const pathname = usePathname();

  const { isRetracted, setIsRetracted } = useRetractable();
  // to not hav a navbar on login page
  if (pathname === "/login") return;
  return (
    <>
      <MobileNav session={session} pathname={pathname} />
      <motion.nav
        className="hidden bg-navbar order-2 xl:order-1 w-full h-full rounded-t-lg xl:rounded-tl-none xl:rounded-r-2xl px-4 pt-2 pb-0 xl:pl-0 xl:pr-6 xl:py-10 xl:flex xl:flex-col xl:items-start xl:justify-between "
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
                href={link.href}
              />
            ))}
          </ul>
        </div>
        {/* <NavbarAvatar isRetracted={isRetracted} session={session} /> */}
        <NavbarAvatar isRetracted={isRetracted} session={session} />
        <div className="hidden xl:block w-full px-8 text-preset-3 text-icon">
          <ThemeSwitcher isRetracted={isRetracted} />
          {/* Retracting navbar */}
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
    </>
  );
}
