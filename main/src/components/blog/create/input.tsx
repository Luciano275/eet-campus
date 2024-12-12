import inputCss from '@css/input.module.css';
import type { ChangeEventHandler } from 'react';
import FormError from './error';
import type { CreateBlogActionErrors, CreateBlogActionState } from 'src/types';

export const Input = ({
  label,
  htmlFor,
  type,
  placeholder,
  onChange,
  field,
  state
}: {
  label: string;
  htmlFor: string;
  type: "text" | "textarea";
  placeholder: string;
  onChange?: ChangeEventHandler;
  field: keyof CreateBlogActionErrors;
  state: CreateBlogActionState;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xl font-semibold">
        {label}
      </label>
      {type === "text" ? (
        <input
          type="text"
          name={htmlFor}
          id={htmlFor}
          placeholder={placeholder}
          className={`input input-bordered w-full ${inputCss['input-field-sizing']}`}
          onChange={onChange}
          aria-describedby={`${htmlFor}-error`}
        />
      ) : (
        <textarea
          name={htmlFor}
          id={htmlFor}
          placeholder={placeholder}
          className={`textarea textarea-bordered ${inputCss['input-field-sizing']}`}
          onChange={onChange}
          aria-describedby={`${htmlFor}-error`}
        ></textarea>
      )}

      <FormError
        state={state}
        id={`${htmlFor}-error`}
        field={field}
      />
    </div>
  );
};