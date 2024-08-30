import { IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  branch_Name: string;

  @IsString()
  branch_Address: string;

  @IsString()
  branch_Manager: string;

  @IsString()
  branch_Phone_Number: string;

  @IsString()
  branch_Email: string;

  @IsString()
  branch_Registration_Number: string;

  @IsNumber()
  company_id: number;
}
