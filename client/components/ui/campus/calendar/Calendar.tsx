'use client'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import { Event } from '@prisma/client';
import { EventComponent } from './Event';

export default function CalendarComponent(
  {events}
  : {
    events: Event[]
  }
) {

    const locales = {
        'es': es
    }

    const localizer = dateFnsLocalizer({
        format: format,
        parse: parse,
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
        getDay: getDay,
        locales
    })

    return (
      <div className='py-4'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor={"start"}
          endAccessor={"end"}
          culture="es"
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            event: "Tarea",
            noEventsInRange: "No hay tareas en este rango",
            showMore: (total: number) => `+${total} más`,
            date: 'Fecha',
            time: 'Hora',
            tomorrow: 'Mañana',
            yesterday: 'Ayer',
          }}
          style={{
            height: 600,
          }}
          components={{
            event: EventComponent
          }}
        />
      </div>
    );
}