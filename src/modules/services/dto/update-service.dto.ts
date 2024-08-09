import { IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  name: string;

  image: string;
}
