import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreatePriceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceItemDto)
  prices: PriceItemDto[];
}

export class PriceItemDto {
  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  service_id: number;

  @IsNotEmpty()
  price: number;
}
