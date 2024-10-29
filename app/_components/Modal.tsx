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
import Button from "./Button";
import Card from "./Card";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createPortal } from "react-dom";

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
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
}

export function ModalTrigger({
  children,
  modalName,
}: {
  children: ReactNode;
  modalName: string;
}) {
  const { setOpenModal } = useModal();
  function handleOpenModal() {
    setOpenModal(modalName);
  }
  return <Button onClick={handleOpenModal}>{children}</Button>;
}

export function ModalWindow({
  header,
  description,
  form,
  modalName,
}: {
  header: string;
  description: string;
  form: ReactNode;
  modalName: string;
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

  return createPortal(
    <div
      className={`${
        openModal === modalName ? "block" : "hidden"
      } fixed w-full h-full flex items-center justify-center top-0 left-0 px-5 z-[100]`}
    >
      <Card className="bg-card-back-ground z-[1000] w-full max-w-[560px] flex flex-col items-center justify-center gap-5">
        <div className="flex items-center justify-between w-full">
          <p className="text-preset-2 text-primary">{header}</p>
          <IoIosCloseCircleOutline
            className="size-[25.5px] text-secondary cursor-pointer hover:text-primary duration-150 transition-all"
            onClick={handleCloseModal}
          />
        </div>
        <p className="text-secondary text-preset-4">{description}</p>

        {form}
      </Card>
      <div
        onClick={handleCloseModal}
        className={`w-full h-full bg-black/50 flex items-center justify-center z-[999] absolute`}
      ></div>
    </div>,
    document.body
  );
}