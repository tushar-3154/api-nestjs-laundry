import { IsDecimal, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  // @IsNotEmpty()
  @IsDecimal()
  @IsOptional()
  mobilenumber: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;
}
