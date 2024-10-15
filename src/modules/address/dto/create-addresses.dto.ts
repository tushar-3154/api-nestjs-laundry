import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  @IsOptional()
  user_id: number;

  @IsString()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  building_number: string;

  @IsString()
  @IsOptional()
  area: string;

  @IsString()
  @IsOptional()
  landmark: string;

  @IsNumber()
  @IsOptional()
  lat: number;

  @IsNumber()
  @IsOptional()
  long: number;

  @IsString()
  @IsOptional()
  @Length(6, 6)
  pincode: number;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;
}
