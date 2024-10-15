import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { BannerType } from 'src/enum/banner_type.enum';

export class UpdateBannerDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(BannerType)
  banner_type?: number;
}
