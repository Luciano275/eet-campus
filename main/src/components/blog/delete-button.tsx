import type { UUIDTypes } from "uuid"
import { IoTrashOutline } from 'react-icons/io5'

export default function DeleteBlogButton(
  {blogId}
  : {
    blogId: UUIDTypes
  }
) {
  return (
    <>
      <button className="hover:text-red-600" data-tooltip-target={`delete-${blogId}`}>
        <IoTrashOutline size={25} />
      </button>

      <div id={`delete-${blogId}`} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Eliminar blog
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}