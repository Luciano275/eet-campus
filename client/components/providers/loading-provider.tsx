'use client';

import { useContext, createContext, useState } from 'react';

interface ILoadingContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
}