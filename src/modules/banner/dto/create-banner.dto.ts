import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  image: string;
}
