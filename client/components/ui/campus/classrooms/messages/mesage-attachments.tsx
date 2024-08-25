import { isImage } from "@/lib/utils"
import { ClassroomMessagesResponse } from "@/types"
import { IoIosDocument } from "react-icons/io"

export default function MessageAttachments(
  {msg}
  : {
    msg: ClassroomMessagesResponse
  }
) {
  return (
    msg.attachmets && (
      <div className="flex flex-wrap gap-4">
        {
          msg.attachmets.map((attachment, index) => (
            <a
              key={`attachment:${attachment.id}:${index}`}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 p-2 border border-base-300 rounded-xl transition-transform w-fit hover:scale-110"
              download={attachment.name}
            >
              { isImage(attachment.name.match(/(?<=\.)\w+$/)?.[0] || '') ? (
                <img
                  src={attachment.url}
                  alt="Image preview"
                  className="w-40 h-auto max-w-40 object-cover rounded-xl"
                />
              ) : (
                <>
                  <IoIosDocument size={62} />
                </>
              ) }
            </a>
          ))
        }
      </div>
    )
  )
}