import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsTrimmedString } from 'src/decorator/trim.decorator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page_number?: number;

  @IsOptional()
  @IsString()
  @IsTrimmedString({ message: 'Search cannot be empty or just whitespace' })
  search?: string;

  @IsOptional()
  @IsString()
  sort_by?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
