'use client';

import { useContext, createContext, useState } from "react";

interface IOpenNotifyContext {
    isOpen: boolean;
    toggle: () => void;
}

const OpenNotifyContext = createContext<IOpenNotifyContext>({ isOpen: false, toggle: () => {} });

export const useOpenNotify = () => useContext(OpenNotifyContext);

export default function OpenNotifyProvider(
    {children}
    : {
        children: React.ReactNode
    }
) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <OpenNotifyContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
            {children}
        </OpenNotifyContext.Provider>
    )
}