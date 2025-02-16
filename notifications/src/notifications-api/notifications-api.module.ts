import { Module } from '@nestjs/common';
import { NotificationsApiService } from './notifications-api.service';
import { NotificationsApiController } from './notifications-api.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [NotificationsApiService, PrismaService],
  controllers: [NotificationsApiController],
})
export class NotificationsApiModule {}
