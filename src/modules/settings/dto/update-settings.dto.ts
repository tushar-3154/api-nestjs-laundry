import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  setting_key: string;

  @IsString()
  @IsNotEmpty()
  setting_value: string;
}
