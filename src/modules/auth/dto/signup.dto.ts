import {
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/modules/validator/is-unique';

export class SignupDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsUnique({ tablename: 'user', column: 'mobilenumber' })
  mobilenumber: number;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  role_id: number;
}
