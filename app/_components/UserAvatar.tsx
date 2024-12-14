import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { motion } from "framer-motion";
import { SessionType } from "../_lib/types";
export default function UserAvatar({ session }: { session: SessionType }) {
  return (
    <Avatar className="size-[50px] xl:size-7 -mr-[2px]">
      <motion.div layout>
        <AvatarImage src={session?.user?.image} />
      </motion.div>
      <AvatarFallback>{session?.user?.name}</AvatarFallback>
    </Avatar>
  );
}
