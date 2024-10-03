"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface RetractableContextType {
  isRetracted: boolean;
  setIsRetracted: Dispatch<SetStateAction<boolean>>;
}
const RetractableContext = createContext<RetractableContextType | undefined>(
  undefined
);
export default function RetractableProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isRetracted, setIsRetracted] = useState<boolean>(false);
  return (
    <RetractableContext.Provider value={{ isRetracted, setIsRetracted }}>
      {children}
    </RetractableContext.Provider>
  );
}
export function useRetractable() {
  const context = useContext(RetractableContext);
  if (context === undefined)
    throw new Error(
      "useRetractableContext must be used within a RetractableProvider"
    );
  return context;
}
