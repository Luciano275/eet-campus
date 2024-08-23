"use client";

import { sendMessageAction } from "@/lib/actions/classroom-messages";
import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomSendMessageAction } from "@/types";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import AttachmentButton from "./Attachment";

const SubmitButton = () => {
  const { pending } = useFormStatus();

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
  apiUrl,
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

  const [localState, setLocalState] =
    useState<ClassroomSendMessageAction>(defaultState);

  const bindSendMessage = sendMessageAction.bind(
    null,
    userId,
    apiUrl,
    classroomId
  );
  const [state, action] = useFormState(bindSendMessage, defaultState);

  useEffect(() => {
    setLocalState(state);

    if (state.success) {
      setTimeout(() => {
        setLocalState(defaultState);
      }, 3000);
    }
  }, [state]);

  return (
    <form
      action={action}
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

      <SubmitButton />

      {localState.message && (
        <p
          className={`text-sm p-4 flex gap-2 items-center rounded-xl ${
            localState.success ? "bg-emerald-600" : "bg-error"
          } text-white`}
        >
          <span>
            {localState.success ? (
              <BiCheckCircle size={18} />
            ) : (
              <BiErrorCircle size={18} />
            )}
          </span>
          <span className="grow">{localState.message}</span>
        </p>
      )}
    </form>
  );
}
