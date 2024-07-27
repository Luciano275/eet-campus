import { GenderOptions } from "@/types";

export default function EditInput (
  {labels, index, toRight, options}
  : {
    labels: string[] | string[][];
    index: number;
    toRight?: boolean;
    options?: GenderOptions
  }
) {
  if (!options){
    return (
      <input
        type="text"
        defaultValue={labels[index]}
        className={`p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500 ${toRight && 'text-end'}`}
      />
    )
  }

  return (
    <select className="p-1 bg-base-300 rounded outline-none border border-base-300 focus:border-blue-500">
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