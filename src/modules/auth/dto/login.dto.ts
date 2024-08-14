import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role_id: number;

  @IsNotEmpty()
  device_type: string;

  @IsNotEmpty()
  device_token: string;
}
