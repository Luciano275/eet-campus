import { Module } from '@nestjs/common';
import { MessagesApiService } from './messages-api.service';
import { MessagesApiController } from './messages-api.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MessagesApiController],
  providers: [MessagesApiService, PrismaService],
})
export class MessagesApiModule {}
