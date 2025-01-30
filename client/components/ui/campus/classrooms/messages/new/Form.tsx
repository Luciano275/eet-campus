"use client";

import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomSendMessageAction } from "@/types";
import React, { useActionState, useEffect, useState } from "react";
import AttachmentButton from "./Attachment";
import { useAttachmentContext } from "@/components/providers/attachment-provider";
import FormAttachments from "./form-attachments";
import FormMessage from "./form-message";
import { sendMessageAction } from "@/lib/actions/classroom-messages";
import EventForm from "./Event";
import { Label, Textarea } from "flowbite-react";
import ContainerInput from "./container-input";
import FormError from "./Error";

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      className={`btn btn-success btn-md text-white transition-opacity ${
        pending && "cursor-default bg-success/50"
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
  apiUrl,
  notificationUrl,
  rol
}: {
  userId: string;
  classroomId: string;
  apiUrl: string;
  notificationUrl: string;
  rol: number;
}) {
  const defaultState = {
    message: null,
    success: null,
    errors: {},
  };

  const { files, setFiles, deleteFile } = useAttachmentContext();
  const [localState, setLocalState] = useState<ClassroomSendMessageAction>(defaultState);

  const bindSendMessageAction = sendMessageAction.bind(
    null,
    { userId, apiUrl, classroomId, files, notificationUrl },
  )

  const [state, action, pending] = useActionState(
    bindSendMessageAction,
    defaultState
  );

  useEffect(() => {
    setLocalState(state);
  }, [state]);

  useEffect(() => {
    if (localState.success) {
      setFiles(null);
      setTimeout(() => setLocalState(defaultState), 3000);
    }
  }, [localState]);

  return (
    <form
      action={action}
      className="w-full max-w-[600px] mx-auto flex flex-col gap-3"
    >
      <ContainerInput>
        <Label htmlFor="message">Mensaje</Label>
        <div className="relative flex flex-col justify-center">
          <Textarea
            name="message"
            className={`py-4 w-full max-h-[300px] pr-14 overflow-y-auto ${dynamicSizeStyles["dynamic-size-content"]}`}
            aria-describedby="message-error"
            defaultValue={state.payload?.get('message') as string || ''}
            placeholder="Escribe el contenido del mensaje aquí"
          />

          <AttachmentButton />
        </div>

        <FormError
          id="message-error"
          state={state}
          field="message"
        />
      </ContainerInput>

      { (rol === 1 || rol === 2) && <EventForm state={state} /> }

      <FormAttachments
        files={files}
        deleteFile={deleteFile}
      />

      <SubmitButton pending={pending} />

      <FormMessage localState={localState} />
    </form>
  );
}
