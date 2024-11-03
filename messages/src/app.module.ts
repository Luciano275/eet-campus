import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { MessagesApiModule } from './messages-api/messages-api.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration]
    }),
    MessagesModule,
    MessagesApiModule,
    HttpModule.register({
      withCredentials: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
