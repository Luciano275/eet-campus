import { IAttachmentContext } from "@/components/providers/attachment-provider"
import { isImage } from "@/lib/utils"
import { FilesTypeAttachment } from "@/types"
import { FaX } from "react-icons/fa6"
import { IoIosDocument } from "react-icons/io"

export default function FormAttachments(
  {files, setFiles}
  : {
    files: FilesTypeAttachment[]
    setFiles: IAttachmentContext['setFiles']
  }
) {

  const handleDeleteFile = (file: { name: string; url: string }) => {
    let tmp = [...files];
    tmp = tmp.filter((f) => f.name !== file.name && f.url !== file.url);
    setFiles(tmp);
  }

  return (
    <div className="flex gap-3 flex-wrap">

    {files.map((file, index) => (
        isImage(
          file.name.match(/\.\w+$/)?.[0] || ''
        ) ? (
          <div
            key={Math.random() * 1000}
            className="avatar p-2 border border-base-300 rounded-xl relative"
          >
            <div className="w-[100px] rounded-xl overflow-hidden">
              <img src={file.url} alt="Preview image" />
            </div>
          
            <span onClick={() => handleDeleteFile(file)} className="absolute right-2 top-2 hover:text-blue-500 cursor-pointer">
              <FaX size={20} />
            </span>
          </div>
        ) : (
          <div
            key={Math.random() * 1000}
            className="flex flex-col justify-center items-center border border-base-300 p-2 rounded-xl w-[150px] max-w-[150px] relative"
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

            <span onClick={() => handleDeleteFile(file)} className="absolute right-2 top-2 hover:text-blue-500 cursor-pointer">
              <FaX size={20} />
            </span>
          </div>
        )
      ))
    }

  </div>
  )
}