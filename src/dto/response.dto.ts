import { IsNotEmpty } from 'class-validator';

export class Response {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  data?: any;
}
