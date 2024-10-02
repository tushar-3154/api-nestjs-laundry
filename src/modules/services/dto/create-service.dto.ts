import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  image: string;

  @IsOptional()
  description: string;
}
