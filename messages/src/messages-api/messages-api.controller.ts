import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MessagesApiService } from './messages-api.service';
import { CreateMessageQueryDto, GetMessageQueryDto } from './dtos/query.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { CreateMessageDto } from './dtos/create-message.dto';
import { DeleteMessageDto } from './dtos/delete-message.dto';

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
      console.log(error);
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ForbiddenException || error instanceof NotFoundException) {
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
      console.log(error);
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ForbiddenException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteMessage(
    @Param('id') messageId: string,
    @Body() deleteMessageDto: DeleteMessageDto
  ) {
    try {
      const message = await this.messagesApiService.deleteMessage(
        messageId,
        deleteMessageDto
      )

      return {
        response: 'Message deleted successfully!',
        message
      }
    }catch (error) {
      console.log(error);
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof ForbiddenException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
