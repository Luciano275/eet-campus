import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveMessageDto } from './dto/saveMessage.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly db: PrismaService
  ) {}

  async saveMessage(saveMessageDto: SaveMessageDto) {
    const message = await this.db.message.create({
      data: {
        body: saveMessageDto.content,
        ownerId: saveMessageDto.from,
        receiverId: saveMessageDto.to,
        status: 'ACTIVE'
      }
    })

    return message;
  }
}
