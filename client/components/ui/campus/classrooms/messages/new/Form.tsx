"use client";

import {
  getSignedUrlAction,
  sendFileAction,
  sendMessageAction,
} from "@/lib/actions/classroom-messages";
import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomSendMessageAction } from "@/types";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import AttachmentButton from "./Attachment";
import { useAttachmentContext } from "@/components/providers/attachment-provider";
import { IoIosDocument } from "react-icons/io";
import { isImage, regexToExtWithSlash } from "@/lib/utils";
import { ClassroomMessageSchema } from "@/lib/schemas/classroom-messages.schema";
import { FaX } from "react-icons/fa6";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const parsedData = ClassroomMessageSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
  
    if (!parsedData.success) {
      setLocalState({
        errors: parsedData.error.flatten().fieldErrors,
        message: "Verifica los campos",
        success: false,
      });
      return;
    }

    try {

      setPending(true);

      const results = await sendMessageAction(
        userId,
        apiUrl,
        classroomId,
        parsedData.data.message,
        files
      );

      setLocalState(results)
      
      form.reset();
      setFiles([]);
      
    }catch (e) {
      console.error(e);
      setLocalState({
        message: "Error al mandar el mensaje",
        success: false,
      });
      return;
    }finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (localState.success) {
      setTimeout(() => {
        setLocalState(defaultState);
      }, 3000);
      return;
    }
  }, [localState]);

  const handleDeleteFile = (file: { name: string; url: string }) => {
    let tmp = [...files];
    tmp = tmp.filter((f) => f.name !== file.name && f.url !== file.url);
    setFiles(tmp);
  }

  return (
    <form
      onSubmit={handleSubmit}
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

      <div className="flex gap-3 flex-wrap">

        {files && (
          files.map((file, index) => (
            isImage(
              file.name.match(/\.\w+$/)?.[0] || ''
            ) ? (
              <div
                key={Math.random() * 1000}
                className="avatar p-2 border border-base-300 rounded-xl relative"
              >
                <div className="w-[100px] rounded-xl overflow-hidden">
                  <img src={file.url} alt="Preview image" />
                </div>
              
                <span onClick={() => handleDeleteFile(file)} className="absolute right-2 top-2 hover:text-blue-500 cursor-pointer">
                  <FaX size={20} />
                </span>
              </div>
            ) : (
              <div
                key={Math.random() * 1000}
                className="flex flex-col justify-center items-center border border-base-300 p-2 rounded-xl w-[150px] max-w-[150px] relative"
              >
                <span>
                  <IoIosDocument size={50} />
                </span>
                <div className="tooltip max-w-full" data-tip={file.name}>
                  <div className="overflow-hidden">
                    <span className="text-sm max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {file.name}
                    </span>
                  </div>
                </div>

                <span onClick={() => handleDeleteFile(file)} className="absolute right-2 top-2 hover:text-blue-500 cursor-pointer">
                  <FaX size={20} />
                </span>
              </div>
            )
          ))
        )}

        {/* {files &&
          Array.from(files).map((file, index) =>
            isImage(file.type.match(regexToExtWithSlash)?.[1] || "") ? (
              <div
                key={Math.random() * 1000}
                className="avatar p-2 border border-base-300 rounded-xl"
              >
                <div className="w-[100px] rounded-xl overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="Preview image" />
                </div>
              </div>
            ) : (
              <div
                key={Math.random() * 1000}
                className="flex flex-col justify-center items-center border border-base-300 p-2 rounded-xl w-[150px] max-w-[150px]"
              >
                <span>
                  <IoIosDocument size={50} />
                </span>
                <div className="tooltip max-w-full" data-tip={file.name}>
                  <div className="overflow-hidden">
                    <span className="text-sm max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {file.name}
                    </span>
                  </div>
                </div>
              </div>
            )
          )} */}

      </div>

      <SubmitButton pending={pending} />

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
