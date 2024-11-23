"use client";

import { createClassroomAction } from "@/lib/actions/classroom";
import ErrorForm from "./ErrorForm";
import { FaCheck } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import { useActionState, useEffect, useState } from "react";
import ErrorMessageForm from "../../error-message";
import dynamicSizeStyles from "@/styles/dynamic-size.module.css";
import { ClassroomType } from "@/types";
import CopyCode from "./Copy";

const SubmitButton = ({ edit, pending }: { edit?: boolean; pending: boolean; }) => {
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

  const bindCreateClassroomAction = createClassroomAction.bind(
    null,
    ownerId,
    edit ? { type: 'update', classroomId: props.classroom.id } : { type: 'create' }
  );

  const [state, formAction, isPending] = useActionState(bindCreateClassroomAction, {
    message: null,
    success: null,
    errors: {},
  });

  return (
    <form
      action={formAction}
      className={`mt-4 ${
        !edit && "w-full max-w-[400px]"
      } mx-auto flex flex-col gap-4`}
    >
      <div className="flex flex-col gap-2">
        <CopyCode classroomCode={edit ? props.classroom.classroomCode : ""} />
      </div>
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

      <SubmitButton edit={edit} pending={isPending} />

      <ErrorMessageForm type="create" state={state}>
        {state.success && state.classroomCode ? (
          <CopyCode classroomCode={state.classroomCode} />
        ) : (
          <></>
        )}
      </ErrorMessageForm>
    </form>
  );
}
