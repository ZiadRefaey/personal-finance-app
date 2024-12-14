import Link from "next/link";
import React, { ReactNode } from "react";

export default function MobileNavItem({
  pathname,
  label,
  href,
  icon,
}: {
  href: string;
  icon: ReactNode;
  pathname: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`${
        (pathname === "/" && label.toLowerCase() === "overview") ||
        pathname === "/" + label.toLowerCase().replace(" ", "-")
          ? "relative after:h-2 after:w-full after:bg-green after:absolute after:bottom-0 after:left-0 after:translate-y-[70%] after:rounded-t-md text-green"
          : "text-icon hover:text-seperator"
      } text-preset-3 py-2 inline-flex items-center justify-start gap-6 duration-150 transition-all `}
    >
      {icon}
      {label}
    </Link>
  );
}
