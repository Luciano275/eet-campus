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
    created_at: true,
    user: { select: { name: true, image: true, id: true } },
    redirect_url: true,
  };

  private TOTAL_NOTIFICATIONS = 10;

  constructor(
    private readonly db: PrismaService,
    private readonly gateway: NotificationsGateway,
  ) {}

  private async findNotificationsByCursor({ userId, cursor }: QueryDto) {
    return cursor
      ? await this.db.notification.findMany({
          where: { userId },
          select: this.DEFAULT_SELECT_NOTIFICATION,
          orderBy: { created_at: 'desc' },
          take: this.TOTAL_NOTIFICATIONS,
          skip: 1,
          cursor: { id: cursor },
        })
      : await this.db.notification.findMany({
          select: this.DEFAULT_SELECT_NOTIFICATION,
          where: { userId },
          orderBy: { created_at: 'desc' },
          take: this.TOTAL_NOTIFICATIONS,
        });
  }

  private async findClassroomById(classroomId: string) {
    return await this.db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true },
    });
  }

  async findNotifications(query: QueryDto) {
    const notifications = await this.findNotificationsByCursor(query);

    const nextCursor =
      notifications.length === this.TOTAL_NOTIFICATIONS
        ? notifications[notifications.length - 1].id
        : null;

    return {
      notifications,
      nextCursor,
    };
  }

  async createNotification(
    { body, userId, redirect_url = null }: CreateNotificationDto,
    query: CreateQueryDto,
  ) {
    if (query.classroomId) {
      const classroomFounded = await this.findClassroomById(query.classroomId);

      if (!classroomFounded) throw new NotFoundException('Classroom not found');

      const membersOnly = await this.db.classroomMember.findMany({
        where: { classroomId: classroomFounded.id },
        select: { userId: true },
      });

      const members =
        classroomFounded.ownerId !== userId
          ? [
              ...membersOnly,
              {
                userId: classroomFounded.ownerId,
              },
            ]
          : membersOnly;

      const notifications = members
        .filter((user) => user.userId !== userId)
        .map((member) => ({
          body,
          userId: member.userId,
          redirect_url,
        }));

      const result = await Promise.all(
        notifications.map(async (notification) => {
          const noti = await this.db.notification.create({
            data: notification,
          });

          this.gateway.emitNotificationEvent(
            `notification:${noti.userId}:new`,
            noti,
          );

          return noti;
        }),
      );

      return result;
    }

    const noti = await this.db.notification.create({
      data: {
        body,
        userId,
        redirect_url,
      },
    });

    this.gateway.emitNotificationEvent(`notification:${userId}:new`, noti);

    return noti;
  }
}
