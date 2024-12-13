import { ClassroomType, CreateClassroomErrors, CreateClassroomType } from "@/types";
import ErrorForm from "./ErrorForm";
import dynamicSizeStyles from "@/styles/dynamic-size.module.css";

export default function Input (
  props
  : {
    type: React.HTMLInputTypeAttribute,
    name: keyof CreateClassroomErrors;
    state: CreateClassroomType;
    label: string;
    edit: false | undefined;
    textarea?: boolean;
    children?: React.ReactNode
  } | {
    edit: true;
    type: React.HTMLInputTypeAttribute,
    name: keyof CreateClassroomErrors;
    state: CreateClassroomType;
    label: string;
    classroom: ClassroomType;
    field: keyof ClassroomType;
    textarea?: boolean;
    children?: React.ReactNode
  }
) {


  const { type, name, label, state, edit } = props;

  return (
    <div className="flex flex-col gap-2">
      {props.children ? props.children : (
        <>
          <label htmlFor={name} className="font-bold">{label}</label>
          {!props.textarea ? (
            <input
              type={type}
              name={name}
              className="input input-bordered w-full"
              aria-labelledby={`${name}Error`}
              defaultValue={edit ? props.classroom[props.field]?.toString() || "" : ""}
            />
          ) : (
            <textarea
              name={name}
              className={`textarea textarea-bordered w-full max-h-[300px] overflow-y-auto ${dynamicSizeStyles["dynamic-size-content"]}`}
              aria-labelledby={`${name}Error`}
              defaultValue={edit ? props.classroom[props.field]?.toString() || "" : ""}
            />
          )}
        </>
      )}

      <ErrorForm
        state={state}
        field={name}
        id={`${name}Error`}
      />
    </div>
  )
}