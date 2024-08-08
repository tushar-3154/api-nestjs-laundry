import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  image?: string;
}
