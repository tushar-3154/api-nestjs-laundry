import { IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  image?: string;
}
