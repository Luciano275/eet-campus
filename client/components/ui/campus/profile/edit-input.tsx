import { useEditFormProvider } from "@/components/providers/edit-form-provider";
import { EditUserActionError, GenderOptions, IEditFormProvider } from "@/types";
import ErrorInput from "./error-input";
import { GENDER_OPTIONS } from "@/lib/utils";
import { format } from "date-fns";

export default function EditInput({
  labels,
  index,
  toRight,
  inputNames,
}: {
  labels: string[] | string[][];
  index: number;
  inputNames: string[];
  toRight?: boolean;
}) {
  const { setEditForm, action } = useEditFormProvider();

  const actualDate = new Date();

  const handleChange = (
    key: keyof IEditFormProvider,
    value: IEditFormProvider[keyof IEditFormProvider]
  ) => {
    setEditForm(key, value === "" ? null : value);
  };

  if (inputNames[index] !== "gender") {
    return (
      <div className="overflow-hidden flex flex-col">
        {inputNames[index] !== "birthday" ? (
          <input
            type="text"
            defaultValue={labels[index]}
            className={`p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500 ${
              toRight && "text-end"
            }`}
            onChange={(e) =>
              handleChange(
                inputNames[index] as keyof IEditFormProvider,
                e.target.value
              )
            }
            aria-describedby={`${inputNames[index]}-error`}
          />
        ) : (
          <input
            type="date"
            defaultValue={
              labels[index]
                ? format(new Date(labels[index] as string), "yyyy'-'MM'-'dd")
                : new Date(actualDate.setHours(actualDate.getHours() - 3)).toISOString().split('T')[0]
            }
            className={`p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500 ${
              toRight && "text-end"
            }`}
            onChange={(e) =>
              handleChange(
                inputNames[index] as keyof IEditFormProvider,
                e.target.value
              )
            }
            aria-describedby={`${inputNames[index]}-error`}
          />
        )}
        <ErrorInput
          state={action}
          id={`${inputNames[index]}-error`}
          field={inputNames[index] as keyof EditUserActionError}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden flex flex-col">
      <select
        onChange={(e) =>
          handleChange(
            inputNames[index] as keyof IEditFormProvider,
            e.target.value
          )
        }
        className="p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500"
        aria-describedby={`${inputNames[index]}-error`}
        defaultValue={labels[index]}
      >
        { GENDER_OPTIONS.map(({value, label}) => (
          <option key={`option:${value}`} value={value}>
            {label}
          </option>
        )) }
      </select>

      <ErrorInput
        state={action}
        id={`${inputNames[index]}-error`}
        field={inputNames[index] as keyof EditUserActionError}
      />
    </div>
  );
}
