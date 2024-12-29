import { BiMessageDetail } from "react-icons/bi";

export default function ProfileActions() {
  return (
    <div className="py-5 flex flex-wrap gap-x-8 gap-y-4 items-center">
      <button className="flex gap-2 items-center text-lg hover:text-blue-600">
        <BiMessageDetail size={20} />
        Enviar mensaje
      </button>
      <button
        className={`text-neutral-400 dark:text-neutral-600 text-lg hover:text-neutral-500`}
      >
        Reportar
      </button>
    </div>
  )
}