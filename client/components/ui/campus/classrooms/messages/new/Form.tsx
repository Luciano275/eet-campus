"use client";

import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomSendMessageAction } from "@/types";
import { useEffect, useState } from "react";
import AttachmentButton from "./Attachment";
import { useAttachmentContext } from "@/components/providers/attachment-provider";
import FormAttachments from "./form-attachments";
import FormMessage from "./form-message";
import { handleSubmit } from "@/components/handlers/classrooms/messages/submit";

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      className={`btn btn-success btn-md text-white transition-opacity ${
        pending && "cursor-default bg-opacity-50"
      } flex relative`}
    >
      {pending && (
        <span className="loading loading-spinner loading-md absolute left-1"></span>
      )}
      <span className="w-full">Enviar</span>
    </button>
  );
};

export default function NewMessageForm({
  userId,
  classroomId,
  apiUrl
}: {
  userId: string;
  classroomId: string;
  apiUrl: string;
}) {
  const defaultState = {
    message: null,
    success: null,
    errors: {},
  };

  const { files, setFiles } = useAttachmentContext();
  const [pending, setPending] = useState(false);

  const [localState, setLocalState] =
    useState<ClassroomSendMessageAction>(defaultState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSubmit(e, {
      apiUrl,
      classroomId,
      files,
      userId,
      setFiles,
      setLocalState,
      setPending,
    })
  };

  useEffect(() => {
    if (localState.success) {
      setTimeout(() => {
        setLocalState(defaultState);
      }, 3000);
      return;
    }
  }, [localState]);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[400px] mx-auto flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="message">Mensaje</label>
        <div className="relative flex flex-col justify-center">
          <textarea
            name="message"
            className={`textarea textarea-bordered w-full max-h-[300px] pr-14 overflow-y-auto ${dynamicSizeStyles["dynamic-size-content"]}`}
          />

          <AttachmentButton />
        </div>
      </div>

      <FormAttachments
        files={files}
        setFiles={setFiles}
      />

      <SubmitButton pending={pending} />

      <FormMessage localState={localState} />
    </form>
  );
}
