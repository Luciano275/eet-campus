import { CorsOptions } from "cors";
import { Server } from "http";
import { Server as SocketServer } from 'socket.io';

export const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.CAMPUS_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

declare global {
  var socket: SocketServer | undefined;
}

export const useSocket = (server: Server) => {
  const socket = globalThis.socket || new SocketServer(server, {
    cors: corsOptions,
    addTrailingSlash: false
  });

  if (process.env.NODE_ENV !== 'production') globalThis.socket = socket;

  return socket;
}