import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from 'src/enum/order-status.eum';
import { PaymentStatus } from 'src/enum/payment-status.enum';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  coupon_code?: string;

  @IsOptional()
  @IsInt()
  coupon_discount?: number;

  @IsOptional()
  @IsNumber()
  express_delivery_charges?: number;

  @IsNumber()
  sub_total: number;

  @IsNumber()
  shipping_charges: number;

  @IsNumber()
  address_id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  @IsEnum(OrderStatus)
  order_status: OrderStatus;

  @IsNumber()
  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}

export class OrderItemDto {
  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  service_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;
}
