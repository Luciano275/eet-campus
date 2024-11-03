import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { MessagesApiModule } from './messages-api/messages-api.module';

@Module({
  imports: [MessagesModule, MessagesApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
