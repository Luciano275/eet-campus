import { FaExclamationCircle } from "react-icons/fa";

export default function ErrorMessage (
  {error}
  : {
    error: Error | null
  }
) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-4">
      <div className="flex items-center gap-1">
        <FaExclamationCircle className="text-gray-400" />
        <span className="text-red-500 text-2xl">{error?.message}</span>
      </div>
      <p className="text-sm text-gray-600">Hubo un problema al cargar los mensajes.</p>
    </div>
  )
}