import { IsString, IsNotEmpty } from 'class-validator'

export class SaveMessageDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}