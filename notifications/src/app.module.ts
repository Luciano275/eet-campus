import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsApiModule } from './notifications-api/notifications-api.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration]
    }),
    NotificationsModule,
    NotificationsApiModule,
    HttpModule.register({
      withCredentials: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
