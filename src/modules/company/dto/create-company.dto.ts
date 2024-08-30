import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CompanyOwed } from 'src/enum/company_owed.enum';

export class CreateCompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip_code: string;

  @IsString()
  company_owner_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  mobile_number: string;

  @IsString()
  email: string;

  @IsString()
  website: string;

  logo: string;

  @IsString()
  registration_number: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  registration_date: Date;

  @IsString()
  gstin: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsEnum(CompanyOwed)
  company_ownedby: number;

  @IsOptional()
  @IsString()
  contract_document?: string;
}
