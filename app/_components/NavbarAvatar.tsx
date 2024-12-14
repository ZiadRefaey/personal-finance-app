import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { motion } from "framer-motion";
import { SessionType } from "../_lib/types";
import { SignOutAction } from "../_lib/actions";
export default function NavbarAvatar({
  isRetracted,
  session,
}: {
  isRetracted: boolean;
  session: SessionType;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center gap-4 py-4 rounded-r-lg cursor-default outline-none px-8 text-preset-3 text-icon  hover:bg-navhover transition-all duration-150">
        <UserAvatar session={session} />

        {!isRetracted && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {session?.user?.name}
          </motion.span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <form action={SignOutAction}>
            <button className="text-preset-4 text-black w-full h-full  transition-all duration-150">
              Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
