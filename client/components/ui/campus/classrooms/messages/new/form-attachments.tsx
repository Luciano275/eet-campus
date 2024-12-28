import { IAttachmentContext } from "@/components/providers/attachment-provider"
import { isImage, regexToExtWithoutDot } from "@/lib/utils"
import { FilesTypeAttachment } from "@/types"
import { IoIosDocument } from "react-icons/io"
import DeleteAttachment from "./delete-attachment"

export default function FormAttachments(
  {files, deleteFile}
  : {
    files: FilesTypeAttachment[]
    deleteFile: IAttachmentContext['deleteFile']
  }
) {
  return (
    <div className="flex gap-3 flex-wrap">

    {files.map((file) => (
        isImage(
          file.name.match(regexToExtWithoutDot)?.[0] || ''
        ) ? (
          <div
            key={Math.random() * 1000}
            className="avatar p-2 border border-base-300 rounded-xl relative overflow-hidden"
          >
            <div className="w-[100px] max-w-[100px] rounded-xl overflow-hidden">
              <img src={file.url} alt="Preview image" className="w-full max-w-full h-full max-h-full object-cover" />
            </div>
          
            <DeleteAttachment deleteFile={deleteFile} file={file} />
          </div>
        ) : (
          <div
            key={Math.random() * 1000}
            className="overflow-hidden flex flex-col justify-center items-center border border-base-300 p-2 rounded-xl w-[150px] max-w-[150px] relative"
          >
            <span>
              <IoIosDocument size={50} />
            </span>
            <div className="tooltip max-w-full" data-tip={file.name}>
              <div className="overflow-hidden">
                <span className="text-sm max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {file.name}
                </span>
              </div>
            </div>

            <DeleteAttachment deleteFile={deleteFile} file={file} />
          </div>
        )
      ))
    }

  </div>
  )
}