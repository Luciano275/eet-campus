import { useEditFormProvider } from "@/components/providers/edit-form-provider";
import { EditUserActionError, GenderOptions, IEditFormProvider } from "@/types";
import ErrorInput from "./error-input";

export default function EditInput (
  {labels, index, toRight, options, inputNames}
  : {
    labels: string[] | string[][];
    index: number;
    inputNames: string[];
    toRight?: boolean;
    options?: GenderOptions
  }
) {

  const { setEditForm, action } = useEditFormProvider();

  const handleChange = (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => {
    setEditForm(key, value === '' ? null : value);
  }

  if (!options){
    return (
      <div className="overflow-hidden flex flex-col">
        <input
          type="text"
          defaultValue={labels[index]}
          className={`p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500 ${toRight && 'text-end'}`}
          onChange={(e) => handleChange(inputNames[index] as keyof IEditFormProvider, e.target.value)}
          aria-describedby={`${inputNames[index]}-error`}
        />
        <ErrorInput
          state={action}
          id={`${inputNames[index]}-error`}
          field={inputNames[index] as keyof EditUserActionError}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden flex flex-col">
      <select
        onChange={(e) => handleChange(inputNames[index] as keyof IEditFormProvider, e.target.value)}
        className="p-1 bg-base-300 rounded outline-none border border-base-3000 focus:border-blue-500"
        aria-describedby={`${inputNames[index]}-error`}
      >
        {options.map((option) => (
          option.label === labels[index] ? (
            <option key={`option:${option.value}`} value={option.value} defaultChecked>{option.label}</option>
          ) : (
            <option key={`option:${option.value}`} value={option.value}>{option.label}</option>
          )
        ))}
      </select>

      <ErrorInput
        state={action}
        id={`${inputNames[index]}-error`}
        field={inputNames[index] as keyof EditUserActionError}
      />
    </div>
  )
}
