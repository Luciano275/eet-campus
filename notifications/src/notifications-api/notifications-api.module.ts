import { Module } from '@nestjs/common';
import { NotificationsApiService } from './notifications-api.service';
import { NotificationsApiController } from './notifications-api.controller';

@Module({
  providers: [NotificationsApiService],
  controllers: [NotificationsApiController]
})
export class NotificationsApiModule {}
