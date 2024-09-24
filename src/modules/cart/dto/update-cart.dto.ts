import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateCartDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  quantity?: number;
}
