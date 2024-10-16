import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BannerType } from 'src/enum/banner_type.enum';

export class CreateBannerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  image: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(BannerType)
  banner_type: number;
}
