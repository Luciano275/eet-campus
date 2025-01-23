"use client";

import { ClassroomMessagesResponse } from "@/types";
import AttachmentButton from "../../new/Attachment";
import dinamicSizeStyles from "@/styles/dynamic-size.module.css";
import Link from "next/link";
import { BASE_PATH } from "@/lib/utils";
import { Textarea } from "flowbite-react";
import { useAttachmentContext } from "@/components/providers/attachment-provider";
import FormAttachments from "../../new/form-attachments";
import { useActionState, useEffect, useMemo } from "react";
import TaskFormMessage from "./task-send-form-message";
import sendTaskAction from "@/lib/actions/task";

export default function TaskSendForm({
  owner,
  classroomId,
  messageId,
  userId,
  notificationUrl,
}: {
  owner: ClassroomMessagesResponse["owner"];
  messageId: string;
  classroomId: string;
  userId: string;
  notificationUrl: string;
}) {
  const initialState = useMemo(
    () => ({
      message: null,
      success: null,
    }),
    []
  );

  const { files, deleteFile, setFiles } = useAttachmentContext();

  const sendTaskActionBind = sendTaskAction.bind(null, {
    classroomId,
    messageId,
    ownerId: userId,
    teacherId: owner.id,
    files,
    notificationUrl,
  });

  const [state, action, isPending] = useActionState(
    sendTaskActionBind,
    initialState
  );

  useEffect(() => {
    setFiles(null);
  }, []);

  useEffect(() => {
    if (state.success) {
      setFiles(null);
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-4" action={action}>
      <div className="flex flex-col gap-4">
        <label htmlFor="comment">
          <span>Mensaje privado a </span>
          <Link
            href={`${BASE_PATH}/profile/${owner.id}`}
            className="hover:text-blue-500 font-bold"
          >
            {owner.name}
          </Link>
        </label>

        <Textarea
          name="comment"
          id="comment"
          placeholder={`Escribe un mensaje privado para ${owner.name}`}
          className={`${dinamicSizeStyles["dynamic-size-content"]} resize-y max-h-[200px]`}
        />
      </div>

      <FormAttachments files={files} deleteFile={deleteFile} />

      <div className="flex flex-wrap gap-4 [&>*]:grow">
        <AttachmentButton blockButton />

        <button
          className={`btn btn-md btn-success text-white ${
            isPending && "contrast-0"
          }`}
          disabled={isPending}
          aria-disabled={isPending}
        >
          Enviar tarea
        </button>
      </div>

      <TaskFormMessage state={state} />
    </form>
  );
}
