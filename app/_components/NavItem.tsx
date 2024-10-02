import React, { ReactNode } from "react";
type NavItemProps = {
  icon: ReactNode;
  label: string;
  pathname: string;
};

export default function NavItem({ icon, label, pathname }: NavItemProps) {
  return (
    <li
      className={`group ${
        (pathname === "/" && label.toLowerCase() === "overview") ||
        pathname === "/" + label.toLowerCase()
          ? "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-green xl:after:h-full xl:after:w-[6px] xl:rounded-r-xl after:opacity-100 bg-background text-green"
          : "bg-inherit text-icon hover:text-seperator"
      }  pt-2 pb-3 px-[22px]  rounded-t-lg h-full xl:h-auto xl:w-full xl:rounded-tl-none  transition-all duration-300 flex flex-col items-center justify-cente gap-1 cursor-pointer xl:flex-row xl:gap-4 xl:py-4 xl:pl-8`}
    >
      {icon}
      <p
        className={`sr-only md:not-sr-only text-preset-5-bold xl:text-preset-3 ${
          (pathname === "/" && label.toLowerCase() === "overview") ||
          pathname === "/" + label.toLowerCase()
            ? "text-primary"
            : ""
        } `}
      >
        {label}
      </p>
    </li>
  );
}
