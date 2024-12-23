'use client'

import ReactTimeAgo from "react-time-ago";

export default function TimeMessage(
  {messageDate}
  : {
    messageDate: Date
  }
) {

  const date = new Date(messageDate);

  return (
    <p
      className={`text-sm text-neutral-400 dark:text-neutral-500`}
    >
      <ReactTimeAgo
        date={date}
        locale="es-AR"
      />
    </p>
  )
}