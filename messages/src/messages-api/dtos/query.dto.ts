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