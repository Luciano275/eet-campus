'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'

export default function CalendarComponent() {

    const [events, setEvents] = useState([
        {
            title: "Examen de Vila",
            start: new Date(2024, 6, 30),
            end: new Date(2024, 6, 30),
            id: 2,
        },
        {
            title: "Tarea de Mereles",
            start: new Date(2024, 6, 31),
            end: new Date(2024, 6, 31),
            id: 3,
        },
        {
            title: "Tarea de Fonseca",
            start: new Date(2024, 6, 29),
            end: new Date(2024, 6, 29),
            id: 4,
        },
        {
            title: "Lo de la Soto",
            start: new Date(2024, 6, 25, 15, 40),
            end: new Date(2024, 6, 25, 17, 10),
            id: 5,
        },
        {
            title: "Lo de la Soto",
            start: new Date(2024, 6, 25, 15, 40),
            end: new Date(2024, 6, 25, 17, 10),
            id: 8,
        },
        {
            title: "Lo de la Dina",
            start: new Date(2024, 6, 25, 15, 0),
            end: new Date(2024, 6, 25, 15, 40),
            id: 6,
        },
    ])

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
      <section className='py-4'>
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
        />
      </section>
    );
}