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
    children?: React.ReactNode;
    onChange?: (e: React.ChangeEvent) => void;
    placeholder?: string;
  } | {
    edit: true;
    type: React.HTMLInputTypeAttribute,
    name: keyof CreateClassroomErrors;
    state: CreateClassroomType;
    label: string;
    classroom: ClassroomType;
    field: keyof ClassroomType;
    textarea?: boolean;
    children?: React.ReactNode;
    onChange?: (e: React.ChangeEvent) => void;
    placeholder?: string;
  }
) {


  const { type, name, label, state, edit, placeholder } = props;

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
              onChange={props.onChange}
              placeholder={placeholder}
            />
          ) : (
            <textarea
              name={name}
              className={`textarea textarea-bordered w-full max-h-screen overflow-y-auto ${dynamicSizeStyles["dynamic-size-content"]}`}
              aria-labelledby={`${name}Error`}
              defaultValue={edit ? props.classroom[props.field]?.toString() || "" : ""}
              onChange={props.onChange}
              placeholder={placeholder}
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