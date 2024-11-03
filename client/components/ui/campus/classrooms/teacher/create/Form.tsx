"use client";

import { createClassroomAction } from "@/lib/actions/classroom";
import { useFormStatus } from "react-dom";
import ErrorForm from "./ErrorForm";
import { FaCheck } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import { useEffect, useState } from "react";
import ErrorMessageForm from "../../error-message";
import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomType } from "@/types";

const SubmitButton = ({ edit }: { edit?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      className={`btn ${
        edit ? "btn-primary" : "btn-success"
      } btn-md text-white transition-opacity ${
        pending && "cursor-default bg-opacity-50"
      } flex relative`}
    >
      {pending && (
        <span className="loading loading-spinner loading-md absolute left-1"></span>
      )}
      <span className="w-full">{edit ? "Guardar" : "Crear"}</span>
    </button>
  );
};

export default function CreateClassroomForm(
  props:
    | {
        children: React.ReactNode;
        ownerId: string;
        edit: false | undefined;
      }
    | {
        children: React.ReactNode;
        edit: true;
        ownerId: string;
        classroom: ClassroomType;
      }
) {
  const { children, edit, ownerId } = props;

  const [isCopied, setIsCopied] = useState(false);

  const bindCreateClassroomAction = createClassroomAction.bind(
    null,
    ownerId,
    edit ? { type: 'update', classroomId: props.classroom.id } : { type: 'create' }
  );

  const [state, formAction] = useActionState(bindCreateClassroomAction, {
    message: null,
    success: null,
    errors: {},
  });

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  return (
    <form
      action={formAction}
      className={`mt-4 ${
        !edit && "w-full max-w-[400px]"
      } mx-auto flex flex-col gap-4`}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="classroomName">Nombre del aula</label>
        <input
          type="text"
          name="classroomName"
          className="input input-bordered w-full"
          aria-labelledby="classroomNameError"
          defaultValue={edit ? props.classroom.name : ""}
        />

        <ErrorForm
          state={state}
          field="classroomName"
          id="classroomNameError"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="classroomDescription">Descripción(opcional)</label>
        <textarea
          name="classroomDescription"
          className={`textarea textarea-bordered w-full max-h-[300px] overflow-y-auto ${dynamicSizeStyles["dynamic-size-content"]}`}
          aria-labelledby="classroomDescriptionError"
          defaultValue={edit ? props.classroom.description || "" : ""}
        />

        <ErrorForm
          state={state}
          field="classroomDescription"
          id="classroomDescriptionError"
        />
      </div>

      <div className="flex flex-col gap-2">
        {children}

        <ErrorForm
          state={state}
          field="classroomCourse"
          id="classroomCourseError"
        />
      </div>

      <div>
        <label htmlFor="classroomColor">Color:</label>
        <input
          type="color"
          name="classroomColor"
          className="input input-bordered w-full"
          aria-labelledby="classroomColorError"
          defaultValue={edit ? props.classroom.classroomColor || "" : ""}
        />

        <ErrorForm
          state={state}
          field="classroomColor"
          id="classroomColorError"
        />
      </div>

      <SubmitButton edit={edit} />

      <ErrorMessageForm type="create" state={state}>
        {state.success && state.classroomCode ? (
          <div className="flex p-2 bg-base-200 rounded overflow-hidden items-center">
            <p className="grow">
              Código: <b>{state.classroomCode}</b>
            </p>

            <button
              type="button"
              className="hover:text-blue-400 relative flex items-center justify-center w-8 h-8"
            >
              <span
                className={`absolute transition-opacity`}
                style={{
                  opacity: isCopied ? 1 : 0,
                  zIndex: isCopied ? 5 : -5,
                }}
              >
                <FaCheck size={20} />
              </span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(state.classroomCode!);
                  setIsCopied(true);
                }}
                className={`absolute transition-opacity`}
                style={{
                  opacity: isCopied ? 0 : 1,
                  zIndex: isCopied ? -5 : 5,
                }}
              >
                <BiCopy size={20} />
              </span>
            </button>
          </div>
        ) : (
          <></>
        )}
      </ErrorMessageForm>
    </form>
  );
}
