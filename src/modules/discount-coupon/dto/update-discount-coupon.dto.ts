import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CouponType, DiscountType } from 'src/enum/coupon_type.enum';

export class UpdateDiscountCouponDto {
  @IsString()
  @IsOptional()
  coupon_code: string;

  @IsOptional()
  @IsString()
  coupon_description?: string;

  @IsString()
  @IsOptional()
  coupon_title: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  start_time: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  end_time: Date;

  @IsOptional()
  @IsNumber()
  total_usage_count?: number;

  @IsOptional()
  @IsNumber()
  maximum_usage_count_per_user?: number;

  @IsOptional()
  @IsEnum(DiscountType)
  discount_type: number;

  @IsOptional()
  @IsEnum(CouponType)
  coupon_type: number;
}
