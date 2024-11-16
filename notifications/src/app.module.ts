import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsApiModule } from './notifications-api/notifications-api.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration]
    }),
    NotificationsModule,
    NotificationsApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
