import { BadRequestException, Body, Controller, ForbiddenException, Get, InternalServerErrorException, Post, Query, UseGuards } from '@nestjs/common';
import { MessagesApiService } from './messages-api.service';
import { CreateMessageQueryDto, GetMessageQueryDto } from './dtos/query.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesApiController {
  constructor(
    private readonly messagesApiService: MessagesApiService
  ) {}

  @Get()
  async getMessages(
    @Query() query: GetMessageQueryDto
  ) {
    try {
      const messages = await this.messagesApiService.findMessages(query)

      return messages
    }catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Post()
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Query() query: CreateMessageQueryDto
  ) {
    try {

      const message = await this.messagesApiService.createMessage(
        createMessageDto,
        query
      )

      return {
        response: 'Message sended!',
        message
      }

    }catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
