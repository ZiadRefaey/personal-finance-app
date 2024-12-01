"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "./UI/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ModalContextType {
  openModal: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);
export function Modal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [openModal, setOpenModal] = useState<string>("");
  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      <div className={className}>{children}</div>
    </ModalContext.Provider>
  );
}
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
}

export function ModalTrigger({
  children,
  modalName,
  className,
  variant,
  primary = true,
}: {
  children: ReactNode;
  modalName: string;
  variant?: "ellipses";
  className?: string;
  primary?: boolean;
}) {
  const { setOpenModal } = useModal();
  function handleOpenModal() {
    setOpenModal(modalName);
  }
  return (
    <Button
      primary={primary}
      className={`${className} ${variant === "ellipses" ? "w-[140px]" : ""}`}
      onClick={handleOpenModal}
    >
      {children}
    </Button>
  );
}

export function ModalWindow({
  header,
  description,
  children,
  modalName,
}: {
  header: string;
  description: string;
  modalName: string;
  children: ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { openModal, setOpenModal } = useModal();
  function handleCloseModal() {
    setOpenModal("");
  }
  useEffect(() => {
    setIsMounted(true); // Runs only on the client side
  }, []);

  if (!isMounted) return null; // Prevents rendering on the server
  const container = document.getElementById("layout-container");
  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {openModal === modalName && (
        <div
          className={`fixed w-full h-full flex items-center justify-center top-0 left-0 px-5 z-[100]`}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0.1 }}
            transition={{ duration: 0.1 }}
            className="rounded-xl py-6 px-5 md:p-8 bg-card-back-ground  z-[1000] w-full max-w-[560px] flex flex-col items-center justify-center gap-5"
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-preset-2 text-primary">{header}</p>
              <IoIosCloseCircleOutline
                className="size-[25.5px] text-secondary cursor-pointer hover:text-primary duration-150 transition-all"
                onClick={handleCloseModal}
              />
            </div>
            <p className="text-secondary text-preset-4">{description}</p>

            {children}
          </motion.div>
          <div
            onClick={handleCloseModal}
            className={`w-full h-full bg-black/50 flex items-center justify-center z-[999] absolute`}
          ></div>
        </div>
      )}
    </AnimatePresence>,
    container
  );
}
