import { isImage, regexToExtWithoutDot } from "@/lib/utils"
import { ClassroomMessagesResponse } from "@/types"
import { IoIosDocument } from "react-icons/io"

export default function MessageAttachments(
  {msg, size = 'sm'}
  : {
    msg: ClassroomMessagesResponse;
    size?: 'sm' | 'md' | 'lg';
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
              className={`mt-4 ${size === 'sm' ? 'p-2' : size === 'md' ? 'p-3' : size === 'lg' ? 'p-4' : ''} border border-base-300 dark:bg-base-300 dark:hover:bg-base-100 rounded-xl transition-transform w-fit hover:scale-110 hover:bg-base-300`}
              download={attachment.name}
            >
              { isImage(attachment.name.match(regexToExtWithoutDot)?.[0] || '') ? (
                <img
                  src={attachment.url}
                  alt="Image preview"
                  className={`${size === 'sm' ? 'w-40 max-w-40' : size === 'md' ? 'w-44 max-w-44' : size === 'lg' ? 'w-48 max-w-48' : ''} h-auto object-cover rounded-xl`}
                />
              ) : (
                <>
                  <IoIosDocument size={
                    size === 'sm' ? 62 : size === 'md' ? 82 : size === 'lg' ? 102 : 24
                  } />
                </>
              ) }
            </a>
          ))
        }
      </div>
    )
  )
}