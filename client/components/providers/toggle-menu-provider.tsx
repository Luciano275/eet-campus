'use client';

import { useContext, useState, createContext } from "react";

interface IToggleMenuContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ToggleMenuContext = createContext<IToggleMenuContext>({
  open: false,
  setOpen: () => {}
});

export const useToggleMenuContext = () => useContext(ToggleMenuContext);

export const ToggleMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ToggleMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </ToggleMenuContext.Provider>
  );
};
