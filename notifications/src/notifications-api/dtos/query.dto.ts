import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class QueryDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  cursor?: string;
}

export class CreateQueryDto {
  @IsUUID()
  @IsOptional()
  classroomId: string;
}