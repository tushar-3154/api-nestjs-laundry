import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  mobile_number?: number;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  role_id?: number;
}
