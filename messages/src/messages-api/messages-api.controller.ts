import { BadRequestException, Controller, ForbiddenException, Get, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { MessagesApiService } from './messages-api.service';
import { GetMessageQueryDto } from './dtos/query.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

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
}
