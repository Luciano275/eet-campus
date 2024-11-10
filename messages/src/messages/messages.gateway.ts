import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class MessagesGateway implements OnModuleInit {

  @WebSocketServer()
  private server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('New connection');
    })
  }

  emitMessageEvent(eventKey: string, data: any) {
    this.server.emit(eventKey, data);
  }
}
