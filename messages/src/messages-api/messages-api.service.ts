import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageQueryDto, GetMessageQueryDto } from './dtos/query.dto';
import { CreateMessageDto } from './dtos/create-message.dto';
import { DeleteMessageDto } from './dtos/delete-message.dto';

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
  
  private async findClassroomById(classroomId: string) {
    const classrooms = await this.db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true }
    })

    if (!classroomId) throw new NotFoundException()

    return classrooms;
  }

  private async findUserById(userId: string) {
    const users = await this.db.user.findUnique({
      where: {id: userId}
    })

    if (!users) throw new ForbiddenException();

    return users;
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

  private async findMessage(messageId: string, userId: string) {
    const message = await this.db.classroomMessage.findUnique({
      where: {
        id: messageId,
        ownerId: userId
      }
    })

    if (!message) throw new NotFoundException();

    return message;
  }

  async findMessages(
    { classroomId, cursor, userId }: GetMessageQueryDto
  ) {
    const userFounded = await this.findUserById(userId);
    const classroomFounded = await this.findClassroomById(classroomId);
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

  async createMessage(
    message: CreateMessageDto,
    { classroomId }: CreateMessageQueryDto
  ) {
    const classroomFounded = await this.findClassroomById(classroomId)

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

  async deleteMessage(
    messageId,
    { classroomId, userId }: DeleteMessageDto
  ) {
    const userFounded = await this.findUserById(userId);
    const classroomFounded = await this.findClassroomById(classroomId);
    const messageFounded = await this.findMessage(messageId, userId);

    await this.db.classroomAttachment.deleteMany({
      where: {messageId: messageFounded.id}
    })

    const newMessage = await this.db.classroomMessage.update({
      where: {
        id: messageFounded.id
      },
      data: {
        body: "Mensaje borrado",
        status: 'DELETED'
      },
      select: this.DEFAULT_SELECT_MESSAGE
    })

    //TODO: Emit socket io event

    return newMessage;
  }
}
