'use client';

import { useContext, createContext, useState } from 'react';

interface IAttachmentContext {
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
}

const AttachmentContext = createContext<IAttachmentContext>({
  files: null,
  setFiles: () => {}
})

export const useAttachmentContext = () => useContext(AttachmentContext);

export default function AttachmentProvider(
  {children}
  : {
    children: React.ReactNode;
  }
) {
  const [files, setFiles] = useState<IAttachmentContext['files']>(null);

  return (
    <AttachmentContext.Provider value={{ files, setFiles }}>
      {children}
    </AttachmentContext.Provider>
  );
}