'use client'

import React, { useContext, createContext, useState } from "react";

interface IClassroomModalContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ClassroomModalContext = createContext<IClassroomModalContext>({
  isOpen: false,
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

  return (
    <ClassroomModalContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </ClassroomModalContext.Provider>
  )
}