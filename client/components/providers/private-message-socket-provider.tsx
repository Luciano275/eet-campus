'use client';

import { use, createContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: null | Socket;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false
});

export const usePrivateMessageSocket = () => use(SocketContext);

export default function PrivateMessageSocketProvider(
  {children, socketUrl, userId}
  : {
    children: React.ReactNode;
    socketUrl: string;
    userId: string;
  }
) {

  const [ socket, setSocket ] = useState<null | Socket>(null);
  const [isConnected, setIsConnected ] = useState<boolean>(false);

  useEffect(() => {

    const socketInstance = io(socketUrl, {
      addTrailingSlash: false,
      auth: {
        userId
      }
    })

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
    <SocketContext.Provider
      value={{
        socket,
        isConnected
      }}
    >
      {children}
    </SocketContext.Provider>
  )

}