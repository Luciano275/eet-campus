import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from 'socket.io'

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication,
    private readonly config: ConfigService
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      ...options,
      addTrailingSlash: false,
      cors: {
        origin: this.config.get<string>('app.cors.origin'),
        credentials: true
      }
    })

    return server;
  }
}