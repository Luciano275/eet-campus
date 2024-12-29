import { IsTaskResponse } from "@/types"
import { format } from "date-fns/format";
import { es } from "date-fns/locale/es";

export default function TaskTitle(
  {event}
  : {
    event: IsTaskResponse['event']
  }
) {
  return (
    <div className="flex flex-wrap-reverse gap-y-8 gap-x-4 justify-between items-center">
      <h2 className="text-3xl font-semibold">{event?.title}</h2>
      <div className="flex flex-col gap-y-2 sm:gap-y-0">
        <p className="flex flex-wrap gap-x-2">
          <span>Fecha de entrega:</span>
          <span className="font-semibold">
            { format(new Date(event?.end!), "dd 'de' MMMM 'del' yyyy", {
              locale: es
            }) }
          </span>
        </p>
        <p className="flex flex-wrap gap-x-2">
          <span>Horario máximo:</span>
          <span className="font-semibold">
            { format(new Date(event?.end!), "HH ':' mm", {
              locale: es
            }) }
          </span>
        </p>
      </div>
    </div>
  )
}