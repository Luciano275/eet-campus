import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class FileItem {
  @IsString()
  name: string;

  @IsString()
  url: string;
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileItem)
  @IsOptional()
  files?: FileItem[];

  @IsBoolean()
  isTask: boolean;
}