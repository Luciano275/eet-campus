'use client';

import { useContext, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface IClassroomSocketContext {
  socket: null | Socket;
  isConnected: boolean | null;
}

const ClassroomSocketContext = createContext<IClassroomSocketContext>({
  socket: null,
  isConnected: null
})

export const useClassroomSocket = () => useContext(ClassroomSocketContext);

export default function ClassroomSocketProvider (
  {children, socketUrl}
  : {
    children: React.ReactNode;
    socketUrl: string;
  }
) {
  const [socket, setSocket] = useState<IClassroomSocketContext['socket']>(null);
  const [isConnected, setIsConnected] = useState<IClassroomSocketContext['isConnected']>(null);

  useEffect(() => {

    const socketInstance = io(socketUrl, { addTrailingSlash: false });

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }

  }, [])

  return (
    <ClassroomSocketContext.Provider
      value={{
        socket,
        isConnected
      }}
    >
      {children}
    </ClassroomSocketContext.Provider>
  )
}