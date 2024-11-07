import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class GetMessageQueryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  classroomId: string;

  @IsString()
  @IsOptional()
  cursor?: string | undefined;
}

export class CreateMessageQueryDto extends PickType(GetMessageQueryDto, ['classroomId'] as const){}