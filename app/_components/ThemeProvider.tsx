"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { getLocalStorage, setLocalStorage } from "../_lib/helperFuncs";

// Define the type for the context
interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the type for the props of the provider component
interface ThemeContextProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeContextProps) {
  // let LocalStorageTheme = getLocalStorage("theme");
  //local storage will be empty on first log in, it sets the default to dark and read it again
  // if (!LocalStorageTheme) {
  //   setLocalStorage("theme", "dark");
  //   LocalStorageTheme = getLocalStorage("theme");
  // }
  const [theme, setTheme] = useState<string>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
}
