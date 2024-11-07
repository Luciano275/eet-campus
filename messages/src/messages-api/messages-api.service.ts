import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageQueryDto, GetMessageQueryDto } from './dtos/query.dto';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class MessagesApiService {

  private DEFAULT_SELECT_MESSAGE = {
    id: true,
    body: true,
    created_at: true,
    owner: { select: { name: true, email: true, image: true, id: true } },
    status: true,
    attachmets: { select: { url: true, id: true, name: true } },
  };

  private TOTAL_MESSAGES = 10;

  constructor(
    private readonly db: PrismaService
  ) {}

  async findMessages(
    { classroomId, cursor, userId }: GetMessageQueryDto
  ) {
    const userFounded = await this.db.user.findUnique({
      where: {id: userId}
    })

    if (!userFounded) {
      throw new ForbiddenException();
    }

    const classroomFounded = await this.db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true }
    })

    if (!classroomFounded) {
      throw new ForbiddenException();
    }

    const isBelong = classroomFounded.members.some(({ userId: memberId }) => memberId === userId) || classroomFounded.ownerId === userId;

    if (!isBelong) {
      return new ForbiddenException();
    }

    const messages = await this.findMessagesByCursor(
      classroomId,
      cursor
    )

    const nextCursor = messages.length === this.TOTAL_MESSAGES ? messages[messages.length-1].id : null;

    return {
      messages,
      nextCursor
    }
  }

  private async findMessagesByCursor(
    classroomId: string,
    cursor?: string | undefined,
  ) {
    return cursor ? (
      await this.db.classroomMessage.findMany({
        select: this.DEFAULT_SELECT_MESSAGE,
        where: {
          classroomId
        },
        orderBy: { created_at: 'desc' },
        take: this.TOTAL_MESSAGES,
        skip: 1,
        cursor: {
          id: cursor
        }
      })
    ): (
      await this.db.classroomMessage.findMany({
        select: this.DEFAULT_SELECT_MESSAGE,
        where: { classroomId },
        orderBy: { created_at: 'asc' },
        take: this.TOTAL_MESSAGES
      })
    )
  }

  async createMessage(
    message: CreateMessageDto,
    { classroomId }: CreateMessageQueryDto
  ) {
    const classroomFounded = await this.db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true }
    })

    if (!classroomFounded) {
      throw new ForbiddenException();
    }

    const isBelong = classroomFounded.members.some((user) => user.userId === message.userId) || classroomFounded.ownerId === message.userId;

    if (!isBelong) {
      return new ForbiddenException();
    }

    const newMessage = await this.db.classroomMessage.create({
      data: {
        body: message.content,
        status: 'ACTIVE',
        classroomId,
        ownerId: message.userId
      },
      select: this.DEFAULT_SELECT_MESSAGE
    })

    if (message.files && message.files.length > 0) {
      await Promise.all(
        message.files.map(async (file) => {
          await this.db.classroomMessage.update({
            where: { id: newMessage.id },
            data: {
              attachmets: {
                create: {
                  name: file.name,
                  url: file.url,
                  ownerId: message.userId
                }
              }
            }
          })
        })
      )
    }

    const messageUpdated = await this.db.classroomMessage.findUnique({
      where: { id: newMessage.id },
      select: this.DEFAULT_SELECT_MESSAGE
    })

    //TODO: emit socket io event

    return messageUpdated;
  }
}
