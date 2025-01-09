import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {

  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {

    const { userId = null } = client.handshake.auth;

    if (!userId) {
      client.disconnect(true);
      return;
    }

    console.log(`new connection: ${userId}`);
  }

  @SubscribeMessage('new:message')
  async handleNewMessage(
    @MessageBody() data,
    @ConnectedSocket() client: Socket
  ) {
    const { receiverId, message } = data;
    const { userId } = client.handshake.auth;

    if (!receiverId) {
      // Emit error message
      return;
    }

    if (!message) {
      // Emit error message
      return;
    }

    const msgData = {
      from: userId,
      to: receiverId,
      content: message,
    }

    try {
      const save = await this.chatService.saveMessage(msgData)

      this.server.emit(`new:message`, msgData);
    }catch (e) {
      console.error('Error saving message:', e);
      
      client.emit('error', 'Error saving message')
    }
  }
}
