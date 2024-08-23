import { IsOptional } from 'class-validator';

export class UpdateBannerDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  image: string;
}
