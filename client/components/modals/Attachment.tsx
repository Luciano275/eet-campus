'use client';

import { useEffect, useState } from "react";
import { useClassroomModal } from "../providers/classroom-modal-provider";
import ModalHeader from "../ui/campus/classrooms/ModalHeader";
import { useAttachmentContext } from "../providers/attachment-provider";
import { regexToExt } from "@/lib/utils";
import { getSignedUrlAction } from "@/lib/actions/classroom-messages";
import InputAttachment from "../ui/campus/classrooms/messages/new/input-attachment";
import FilesAttachments from "../ui/campus/classrooms/messages/new/files-attachments";
import AttachmentsButtons from "../ui/campus/classrooms/messages/new/attachments-buttons";

export default function Attachment(
  {bucketURL}
  : {
    bucketURL: string
  }
) {
  
  const defaultState = {
    message: null,
    success: null
  }

  const { type, isOpen, setIsOpen, setType } = useClassroomModal();
  const { files: filesContext ,setFiles: setFilesContext } = useAttachmentContext();

  const [info, setInfo] = useState<{success: null | false; message: null | string}>(defaultState);
  const [pending, setPending] = useState(false);

  const [files, setFiles] = useState<null | FileList>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (files) {
      Array.from(files).forEach(async (file, index, self) => {
        const ext = file.name.match(regexToExt)?.[0] || '';

        setPending(true);

        try {

          const signedUrl = await getSignedUrlAction(ext);

          if (signedUrl.error) {
            setInfo({
              message: signedUrl.error,
              success: false
            })
            return;
          }

          const rq = await fetch(signedUrl.success?.url!, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            }
          })

          if (!rq.ok) {
            setInfo({
              message: rq.statusText,
              success: false
            });
            return;
          }

          setFilesContext({
            name: file.name,
            url: `${bucketURL}/${signedUrl.success?.key!}`,
          })

          if (index === self.length-1) {
            form.reset();
            setIsOpen(false);
            setInfo(defaultState);
            setFiles(null);
            setType(null);
          }

        }catch (e) {
          console.error(e);
          setInfo({
            message: 'Algo salio mal',
            success: false
          })
        }finally {
          setPending(false);
        }
      })
    }
  }

  useEffect(() => {
    if (files?.length === 0) setFiles(null);
  }, [files])

  if (isOpen && type === "attachment") {
    return (
      <>
        <ModalHeader title="Adjuntar archivos" />
        <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-4">

          <div className="relative flex flex-col justify-center min-h-[100px] bg-base-100 rounded-lg">
            { !files || files.length === 0 ? (
              <InputAttachment setFiles={setFiles} />
            ) : (
              <FilesAttachments files={files} />
            ) }
          </div>

          <AttachmentsButtons files={files} pending={pending} setFiles={setFiles} />

          { info.success && <div className={`text-center text-${info.success? 'green' :'red'}-500`}>{info.message}</div>}
        </form>
      </>
    );
  }

}