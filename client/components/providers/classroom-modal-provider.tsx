'use client'

import React, { useContext, createContext, useState } from "react";

type TypeModals = 'join' | 'deleteMessage' | 'attachment' | null

interface IClassroomModalContext {
  isOpen: boolean;
  type: TypeModals;
  options?: Record<string, string>;
  setOptions: (options: Record<string, string>) => void;
  setType: (type: TypeModals) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ClassroomModalContext = createContext<IClassroomModalContext>({
  isOpen: false,
  type: null,
  setOptions: (options) => {},
  setType: (type) => {},
  setIsOpen: (value) => {},
})

export const useClassroomModal = () => useContext(ClassroomModalContext);

export default function ClassroomModalProvider(
  {children}
  : {
    children: React.ReactNode
  }
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<IClassroomModalContext['type']>(null);
  const [options, setOptions] = useState<IClassroomModalContext['options']>(undefined);

  return (
    <ClassroomModalContext.Provider
      value={{
        isOpen,
        type,
        options,
        setOptions,
        setType,
        setIsOpen
      }}
    >
      {children}
    </ClassroomModalContext.Provider>
  )
}