import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class NotificationsGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('New connection');
    });
  }

  emitNotificationEvent(event: string, content: any) {
    this.server.emit(event, content);
  }
}
