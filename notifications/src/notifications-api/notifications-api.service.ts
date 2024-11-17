import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQueryDto, QueryDto } from './dtos/query.dto';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class NotificationsApiService {

  private DEFAULT_SELECT_NOTIFICATION = {
    id: true,
    body: true,
    classroom: { select: { name: true, id: true } },
    created_at: true,
    user: { select: { name: true, image: true, id: true} }
  }
  
  private TOTAL_NOTIFICATIONS = 10;

  constructor(
    private readonly db: PrismaService,
    private readonly gateway: NotificationsGateway
  ) {}

  private async findNotificationsByCursor(
    { userId, cursor }: QueryDto
  ) {
    return cursor ? (
      await this.db.notification.findMany({
        where: { userId },
        select: this.DEFAULT_SELECT_NOTIFICATION,
        orderBy: { created_at: 'desc' },
        take: this.TOTAL_NOTIFICATIONS,
        skip: 1,
        cursor: { id: cursor }
      })
    ) : (
      await this.db.notification.findMany({
        select: this.DEFAULT_SELECT_NOTIFICATION,
        where: { userId },
        orderBy: { created_at: 'desc' },
        take: this.TOTAL_NOTIFICATIONS
      })
    )
  }

  private async findClassroomById(classroomId: string) {
    return await this.db.classroom.findUnique({where: {id: classroomId}, include: {members: true} })
  }

  async findNotifications(
    query: QueryDto
  ) {
    const notifications = await this.findNotificationsByCursor(query);

    const nextCursor = notifications.length === this.TOTAL_NOTIFICATIONS ? notifications[notifications.length-1].id : null;

    return {
      notifications,
      nextCursor
    }
  }

  async createNotification(
    { body, userId }: CreateNotificationDto,
    query: CreateQueryDto
  ) {
    const classroomFounded = await this.findClassroomById(query.classroomId);

    if (!classroomFounded) throw new NotFoundException()

    const notification = await this.db.notification.create({
      data: {
        body,
        userId,
        classroomId: classroomFounded.id
      }
    })

    this.gateway.emitNotificationEvent(
      `notification:${userId}:new`,
      notification
    )

    return notification;
  }

}
