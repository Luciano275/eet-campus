import { useEditFormProvider } from "@/components/providers/edit-form-provider";
import { GenderOptions, IEditFormProvider } from "@/types";

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

  const { setEditForm } = useEditFormProvider();

  const handleChange = (key: keyof IEditFormProvider, value: IEditFormProvider[keyof IEditFormProvider]) => {
    setEditForm(key, value);
  }

  if (!options){
    return (
      <input
        type="text"
        defaultValue={labels[index]}
        className={`p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500 ${toRight && 'text-end'}`}
        onChange={(e) => handleChange(inputNames[index] as keyof IEditFormProvider, e.target.value)}
      />
    )
  }

  return (
    <select
      onChange={(e) => handleChange(inputNames[index] as keyof IEditFormProvider, e.target.value)}
      className="p-1 bg-base-300 rounded outline-none border border-base-3000 focus:border-blue-500"
    >
      {options.map((option) => (
        option.label === labels[index] ? (
          <option value={option.value} defaultChecked>{option.label}</option>
        ) : (
          <option value={option.value}>{option.label}</option>
        )
      ))}
    </select>
  )
}