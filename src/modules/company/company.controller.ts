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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'contract_document', maxCount: 1 },
      ],
      fileUpload(FilePath.CONTRACT_DOCUMENT),
    ),
  )
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      contract_document?: Express.Multer.File[];
    },
  ): Promise<Response> {
    const logoFile = files?.logo?.[0];
    const contractFile = files?.contract_document?.[0];

    if (!logoFile || !contractFile) {
      throw new HttpException(
        'Both logo and contract document must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const logoPath = logoFile
      ? FilePath.COMPANY_LOGO + '/' + logoFile.filename
      : null;
    const contractDocumentPath = contractFile
      ? FilePath.CONTRACT_DOCUMENT + '/' + contractFile.filename
      : null;
    console.log(logoPath);
    console.log(contractDocumentPath);

    return await this.companyService.create(
      createCompanyDto,
      logoPath,
      contractDocumentPath,
    );
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
