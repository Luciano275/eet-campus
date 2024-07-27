'use client';

import { useContext, createContext, useState } from "react";

interface IEditModeContext {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const EditModeContext = createContext<IEditModeContext>({
  editMode: false,
  setEditMode: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [editMode, setEditMode] = useState(false);

  return <EditModeContext.Provider value={{ editMode, setEditMode }}>{children}</EditModeContext.Provider>;
};