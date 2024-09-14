import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SendResetLinkDto {
  @IsNotEmpty()
  @IsNumberString()
  mobile_number: number;
}
