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
  company_Name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip_code: string;

  @IsString()
  company_Owner_Name: string;

  @IsString()
  phone_Number: string;

  @IsString()
  mobile_Number: string;

  @IsString()
  email: string;

  @IsString()
  website: string;

  logo: string;

  @IsString()
  registration_Number: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  registration_Date: Date;

  @IsString()
  gstin: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsEnum(CompanyOwed)
  company_OwnedBy: number;

  @IsOptional()
  @IsString()
  contract_Document?: string;
}
