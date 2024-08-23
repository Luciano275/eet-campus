'use client';

import { useEffect, useState } from "react";
import { useClassroomModal } from "../providers/classroom-modal-provider";
import ModalHeader from "../ui/campus/classrooms/ModalHeader";
import fileStyles from '@/styles/file.module.css'

export default function Attachment() {
  
  const { type, isOpen, setIsOpen, setType } = useClassroomModal();

  const [files, setFiles] = useState<null | FileList>(null);

  useEffect(() => {
    console.log(files)
  }, [files])

  if (isOpen && type === "attachment") {
    return (
      <>
        <ModalHeader title="Adjuntar archivos" />
        <form className="flex flex-col mt-4 gap-4">
          <div className="relative flex flex-col justify-center min-h-[100px] bg-base-100 rounded-lg">
            { !files || files.length === 0 ? (
              <>
                <input
                  type="file"
                  name="attachment"
                  className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer"
                  id={fileStyles['inputFile']}
                  multiple
                  onChange={(e) => {
                    setFiles(e.target.files || null);
                  }}
                />
                <span className="flex flex-col items-center text-center">
                  <span>Arrastra y suelta los archivos o</span>
                  <span className="text-blue-500">Click aqui</span>
                </span>
              </>
            ) : (
              <div className="flex flex-col p-2 overflow-x-hidden overflow-y-auto">
                {
                  Array.from(files).map((file, index) => (
                    <span key={`file:${index}:${file.size}`} className="text-center">{file.name}</span>
                  ))
                }
              </div>
            ) }
          </div>
          <div className="flex gap-2 justify-end">
            <button className="btn btn-primary btn-md">Subir</button>
            { files && files.length > 0 && (
              <button type="button" onClick={() => setFiles(null)} className="btn btn-error btn-outline btn-md">Cancelar</button>
            ) }
          </div>
        </form>
      </>
    );
  }

}