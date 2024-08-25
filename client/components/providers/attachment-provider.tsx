'use client';

import { useContext, createContext, useState } from 'react';

interface IAttachmentContext {
  files: {
    name: string;
    url: string;
  }[];
  setFiles: (files: { name: string; url: string }[]) => void;
}

const AttachmentContext = createContext<IAttachmentContext>({
  files: [],
  setFiles: () => {}
})

export const useAttachmentContext = () => useContext(AttachmentContext);

export default function AttachmentProvider(
  {children}
  : {
    children: React.ReactNode;
  }
) {
  const [files, setFilesLocal] = useState<IAttachmentContext['files']>([]);

  return (
    <AttachmentContext.Provider value={{ files, setFiles: (file) => setFilesLocal(file) }}>
      {children}
    </AttachmentContext.Provider>
  );
}