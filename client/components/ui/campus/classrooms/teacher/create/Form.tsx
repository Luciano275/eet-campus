"use client";

import { createClassroomAction } from "@/lib/actions/classroom";
import { useActionState } from "react";
import ErrorMessageForm from "../../error-message";
import { ClassroomType } from "@/types";
import CopyCode from "./Copy";
import Input from "./Input";

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
      
      {!edit ? (
        <>
          <Input type="text" name="classroomName" state={state} label="Nombre del aula" edit={false} />
          <Input type="text" textarea name="classroomDescription" state={state} label="Descripción(opcional)" edit={false} />
        </>
      ) : (
        <>
          <Input type="text" name="classroomName" state={state} label="Nombre del aula" edit classroom={props.classroom} field="name" />
          <Input type="text" textarea name="classroomDescription" state={state} label="Descripción(opcional)" edit classroom={props.classroom} field="description" />
        </>
      )}

      <Input type="text" state={state} edit={false} label="" name="classroomCourse">
        {children}
      </Input>

      { !edit ? (
        <Input type="color" name="classroomColor" edit={false} label="Color:" state={state} />
      ) : (
        <Input type="color" name="classroomColor" label="Color:" state={state} edit classroom={props.classroom} field="classroomColor" />
      ) }

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
