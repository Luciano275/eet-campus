import { FaTrash } from "react-icons/fa";

export default function DeleteNotification(
  {id}
  : {
    id: string;
  }
) {
  return (
    <button
      className="hover:text-red-500 p-2"
    >
      <FaTrash size={18} />
    </button>
  )
}