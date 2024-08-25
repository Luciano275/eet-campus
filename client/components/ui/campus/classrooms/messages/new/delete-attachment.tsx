import { IAttachmentContext } from "@/components/providers/attachment-provider";
import { FilesTypeAttachment } from "@/types";
import { FaTrash } from "react-icons/fa";

export default function DeleteAttachment (
  {deleteFile, file}
  : {
    deleteFile: IAttachmentContext['deleteFile']
    file: FilesTypeAttachment
  }
) {

  const handleDeleteFile = (file: FilesTypeAttachment) => {
    deleteFile(file);
  }

  return (
    <span onClick={() => handleDeleteFile(file)} className="absolute top-0 left-0 w-full h-full bg-red-500 bg-opacity-10 backdrop-blur-sm hover:text-blue-500 transition-opacity opacity-0 hover:opacity-100 cursor-pointer flex justify-center items-center">
      <FaTrash size={20} />
    </span>
  )
}