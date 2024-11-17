import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}