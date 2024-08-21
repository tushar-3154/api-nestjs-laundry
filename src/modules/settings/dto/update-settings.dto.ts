import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  setting_key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
