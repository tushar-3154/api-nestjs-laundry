import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePath } from 'src/constants/FilePath';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { fileUpload } from 'src/multer/image-upload';
import { RolesGuard } from '../auth/guard/role.guard';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', fileUpload(FilePath.COMPANY_LOGO)))
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    if (!file) {
      throw new HttpException('File must be provide', HttpStatus.BAD_REQUEST);
    }
    const logoPath = file ? FilePath.COMPANY_LOGO + '/' + file.filename : null;
    return await this.companyService.create(createCompanyDto, logoPath);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Response> {
    return await this.companyService.findAll(paginationQueryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Response> {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo', fileUpload(FilePath.COMPANY_LOGO)))
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    const logopath = file ? FilePath.COMPANY_LOGO + '/' + file.filename : null;
    return await this.companyService.update(id, updateCompanyDto, logopath);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Response> {
    return await this.companyService.delete(id);
  }
}
