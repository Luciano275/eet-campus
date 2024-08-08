"use client";

import { TypeModal } from "@/types";
import { useContext, createContext, useState } from "react";

interface IModalContext {
  isOpen: boolean;
  type: TypeModal;
  toggle: () => void;
  setType: (type: TypeModal) => void;
}

const ModalContext = createContext<IModalContext>({
  isOpen: false,
  type: TypeModal.JoinClassroom,
  toggle: () => {},
  setType: (type: TypeModal) => {},
});

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(TypeModal.JoinClassroom);

  return (
    <ModalContext.Provider
      value={{ isOpen, type, toggle: () => setIsOpen(!isOpen), setType }}
    >
      {children}
    </ModalContext.Provider>
  );
}
