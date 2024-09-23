import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddCartItemDto {
  @IsInt()
  category_id: number;

  @IsInt()
  product_id: number;

  @IsInt()
  service_id: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  price: number;
}
