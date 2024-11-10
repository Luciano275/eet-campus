import { PickType } from "@nestjs/mapped-types";
import { CreateMessageDto } from "./create-message.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteMessageDto extends PickType(CreateMessageDto, ['userId'] as const){
  @IsString()
  @IsNotEmpty()
  classroomId: string;
}