import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty()
  @IsString()
  coupon_Code: string;

  @IsNotEmpty()
  @IsNumber()
  order_Total: number;
}
