import { IsNotEmpty, IsNumber } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsNumber()
  mobile_number: number;
}
