import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role_id: number;

  @IsOptional()
  device_type?: string;

  @IsOptional()
  device_token?: string;
}
