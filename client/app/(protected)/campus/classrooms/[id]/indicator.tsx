'use client';

import { useClassroomSocket } from "@/components/providers/classroom-socket-provider";

export default function SocketIndicator() {

  const { isConnected } = useClassroomSocket();

  return (
    <p>{isConnected ? 'Connected' : isConnected === false ? 'Disconnected' : 'Loading...'}</p>
  )
}