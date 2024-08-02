'use client';

import { useContext, createContext, useState } from 'react';

interface IAlertContext {
  message: string | null;
  success: boolean | null;
  isOpen: boolean;
  setAlert: (message: string | null, success: boolean | null, isOpen: boolean) => void;
}

const AlertContext = createContext<IAlertContext>({
  message: null,
  success: null,
  isOpen: false,
  setAlert: () => {}
});

export const useAlert = () => useContext(AlertContext);

export default function AlertProvider(
  {children}
  : {
    children: React.ReactNode
  }
) {
  const [message, setMessage] = useState<IAlertContext['message']>(null);
  const [success, setSuccess] = useState<IAlertContext['success']>(null);
  const [isOpen, setIsOpen] = useState<IAlertContext['isOpen']>(false);

  const setAlert = (message: IAlertContext['message'], success: IAlertContext['success'], isOpen: IAlertContext['isOpen']) => {
    setMessage(message);
    setSuccess(success);
    setIsOpen(isOpen);
  };

  return (
    <AlertContext.Provider value={{ message, success, isOpen, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}