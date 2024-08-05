import { IsDecimal, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsDecimal()
  @IsOptional()
  mobile_number: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
