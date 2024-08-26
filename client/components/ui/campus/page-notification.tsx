import { ClassroomHookNotifications } from "@/types"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import ContainerNotification from "./container-notification"
import DeleteNotification from "./delete-notification"

export default function PageNotification(
  {page}
  : {
    page: ClassroomHookNotifications
  }
) {
  return (
    page.notifications.map((notify, index) => (
      <div key={`page:${index}:${notify.id}`} className="pb-2 border-b border-base-100">
        <div className="p-2 transition-colors bg-base-200 hover:bg-base-300 rounded-lg">
          <ContainerNotification notify={notify}>
            <div className="grow">
              <Markdown
                remarkPlugins={[remarkGfm]}
              >
                {notify.body}
              </Markdown>
            </div>
            
            <DeleteNotification id={notify.id} />
          </ContainerNotification>
        </div>
      </div>
    ))
  )
}