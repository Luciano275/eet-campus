'use client';

import { useContext, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface INotificationsContext {
  socket: null | Socket;
  isConnected: boolean | null;
}

const NotificationsSocketContext = createContext<INotificationsContext>({
  socket: null,
  isConnected: null
})

export const useNotificationsSocket = () => useContext(NotificationsSocketContext);

export default function NotificationsProvider (
  {children, socketUrl}
  : {
    children: React.ReactNode;
    socketUrl: string;
  }
) {
  const [socket, setSocket] = useState<INotificationsContext['socket']>(null);
  const [isConnected, setIsConnected] = useState<INotificationsContext['isConnected']>(null);

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
    <NotificationsSocketContext.Provider
      value={{
        socket,
        isConnected
      }}
    >
      {children}
    </NotificationsSocketContext.Provider>
  )
}