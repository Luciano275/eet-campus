'use client'

import { ClassroomMessagesResponse } from "@/types";
import AttachmentButton from "../../new/Attachment";
import dinamicSizeStyles from '@/styles/dynamic-size.module.css'
import Link from "next/link";
import { BASE_PATH } from "@/lib/utils";
import { Textarea } from 'flowbite-react';
import { useAttachmentContext } from "@/components/providers/attachment-provider";
import FormAttachments from "../../new/form-attachments";
import { useEffect } from "react";

export default function TaskSendForm(
  { owner }
  : {
    owner: ClassroomMessagesResponse['owner']
  }
) {

  const { files, deleteFile, setFiles } = useAttachmentContext();

  useEffect(() => {
    setFiles(null)
  }, [])

  return (
    <form
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="private-message">
          <span>Mensaje privado a </span>
          <Link
            href={`${BASE_PATH}/profile/${owner.id}`}
            className="hover:text-blue-500 font-bold"
          >{owner.name}</Link>
        </label>

        <Textarea
          name="private-message"
          id="private-message"
          placeholder={`Escribe un mensaje privado para ${owner.name}`}
          className={`${dinamicSizeStyles['dynamic-size-content']} resize-y max-h-[200px]`}
        />
      </div>

      <FormAttachments files={files} deleteFile={deleteFile} />

      <div className="flex flex-wrap gap-4 [&>*]:grow">
        <AttachmentButton blockButton />

        <button className="btn btn-md btn-success text-white">
          Enviar tarea
        </button>
      </div>
    </form>
  )
}