import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { getLocalStorage, setLocalStorage } from "../_lib/helperFuncs";

export default function ThemeSwitcher({
  isRetracted,
}: {
  isRetracted: boolean;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        const localStorageTheme = getLocalStorage("theme");

        if (localStorageTheme === "dark") setLocalStorage("theme", "light");
        else setLocalStorage("theme", "dark");
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
  );
}
