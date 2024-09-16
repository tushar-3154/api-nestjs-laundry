import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsNumber()
  mobile_number: number;

  @IsNotEmpty()
  otp: number;

  @IsNotEmpty()
  new_password: string;
}
