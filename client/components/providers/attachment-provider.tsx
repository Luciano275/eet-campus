"use client";

import { FilesTypeAttachment } from "@/types";
import { useContext, createContext, useState } from "react";

export interface IAttachmentContext {
  files: FilesTypeAttachment[];
  setFiles: (files: FilesTypeAttachment | null) => void;
  deleteFile: (file: FilesTypeAttachment) => void;
}

const AttachmentContext = createContext<IAttachmentContext>({
  files: [],
  setFiles: () => {},
  deleteFile: () => {},
});

export const useAttachmentContext = () => useContext(AttachmentContext);

export default function AttachmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFilesLocal] = useState<IAttachmentContext["files"]>([]);

  return (
    <AttachmentContext.Provider
      value={{
        files,
        setFiles: (file) =>
          setFilesLocal((prev) => (prev && file ? [...prev, file] : [])),
        deleteFile: (file) => {
          let tmp = [...files]
          tmp = tmp.filter((f) => f.name!== file.name && f.url!== file.url);
          setFilesLocal(tmp);
        }
      }}
    >
      {children}
    </AttachmentContext.Provider>
  );
}
