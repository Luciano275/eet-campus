'use client';

import { FilesTypeAttachment } from '@/types';
import { useContext, createContext, useState } from 'react';

export interface IAttachmentContext {
  files: FilesTypeAttachment[];
  setFiles: (files: FilesTypeAttachment[]) => void;
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