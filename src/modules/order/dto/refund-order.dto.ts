import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { RefundStatus } from 'src/enum/refund_status.enum';

export class RefundOrderDto {
  @IsNotEmpty()
  order_id: number;

  @IsNumber()
  refund_amount: number;

  @IsEnum(RefundStatus)
  refund_status: RefundStatus;

  @IsOptional()
  refund_description?: string;
}
