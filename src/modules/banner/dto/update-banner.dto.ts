import { IsNotEmpty } from 'class-validator';

export class UpdateBannerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  image: string;
}
