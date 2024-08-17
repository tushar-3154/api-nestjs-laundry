import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: {
    category_id: number;
    service_id: number;
    product_id: number;
    description: string;
  }[];

  @IsOptional()
  @IsNumber()
  extra_charges?: number;

  @IsOptional()
  coupon_code?: string;

  @IsNumber()
  subTotal: number;

  @IsNumber()
  shippingCharge: number;

  @IsNumber()
  address_id: number;
}
