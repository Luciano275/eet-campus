import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsApiService } from './notifications-api.service';
import { CreateQueryDto, QueryDto } from './dtos/query.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsApiController {
  constructor(
    private readonly notificationsApiService: NotificationsApiService,
  ) {}

  @Get()
  async getNotifications(@Query() queryDto: QueryDto) {
    try {
      const notifications =
        await this.notificationsApiService.findNotifications(queryDto);

      return notifications;
    } catch (e) {
      console.log(e);

      if (e instanceof PrismaClientValidationError) {
        throw new BadRequestException(e.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Post()
  async addNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @Query() queryDto: CreateQueryDto,
  ) {
    try {
      const notifications =
        await this.notificationsApiService.createNotification(
          createNotificationDto,
          queryDto,
        );

      return {
        response: 'Notification created successfully!',
        notifications,
      };
    } catch (e) {
      console.log(e);

      if (e instanceof PrismaClientValidationError) {
        throw new BadRequestException(e.message);
      }

      if (e instanceof NotFoundException) throw e;

      throw new InternalServerErrorException();
    }
  }
}
