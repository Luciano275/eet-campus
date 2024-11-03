import { Module } from '@nestjs/common';
import { MessagesApiService } from './messages-api.service';
import { MessagesApiController } from './messages-api.controller';

@Module({
  providers: [MessagesApiService],
  controllers: [MessagesApiController]
})
export class MessagesApiModule {}
