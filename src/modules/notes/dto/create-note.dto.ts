import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  order_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  text_note: string;

  image: string;
}
