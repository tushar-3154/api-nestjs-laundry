import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  text_note?: string;

  @IsOptional()
  image?: string;
}
