"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import MobileNavItems from "./MobileNavItems";
import { SessionType } from "../_lib/types";

export default function MobileNav({
  pathname,
  session,
}: {
  pathname: string;
  session: SessionType;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <motion.div
        variants={{
          open: {
            clipPath: `circle(${1200 * 2 + 200}px at 50px calc(100% - 50px))`,
            transition: {
              type: "spring",
              stiffness: 20,
              restDelta: 2,
            },
          },
          closed: {
            clipPath: "circle(30px at 50px calc(100% - 50px))",
            transition: {
              delay: 0.65,
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
          },
        }}
        animate={isOpen ? "open" : "closed"}
        className=" xl:hidden bg-navbar w-[200vw] fixed top-0 left-0 h-full cursor-pointer z-50"
      >
        <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <MobileNavItems
          session={session}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          pathname={pathname}
        />
      </motion.div>
    </>
  );
}
