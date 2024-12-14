import { AnimatePresence } from "framer-motion";
import MobileNavItemsList from "./MobileNavItemsList";
import NavbarAvatar from "./NavbarAvatar";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion } from "framer-motion";
import { SessionType } from "../_lib/types";
export default function MobileNavItems({
  isOpen,
  pathname,
  setIsOpen,
  session,
}: {
  setIsOpen: any;
  isOpen: boolean;
  pathname: string;
  session: SessionType;
}) {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { delay: 1 },
    },
    close: {
      y: 15,
      opacity: 0,
      transition: { delay: 0.5 },
    },
  };
  return (
    <AnimatePresence>
      <motion.nav className="fixed top-0 left-0 w-full h-full flex items-start justify-between flex-col pt-10 pb-[100px]">
        <motion.div variants={variants} animate={isOpen ? "open" : "close"}>
          <NavbarAvatar session={session} isRetracted={false} />
        </motion.div>
        <MobileNavItemsList
          pathname={pathname}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <motion.div
          variants={variants}
          animate={isOpen ? "open" : "close"}
          className="w-full px-8 text-preset-3 text-icon"
        >
          <ThemeSwitcher isRetracted={false} />
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
