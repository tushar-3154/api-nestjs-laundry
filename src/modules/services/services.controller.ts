import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
import { fileUpload } from '../../multer/image-upload';
import { RolesGuard } from '../auth/guard/role.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Get('mobile')
  @Roles(Role.CUSTOMER)
  async getAll(): Promise<Response> {
    return await this.serviceService.getAll();
  }

  @Get()
  async findAll(): Promise<Response> {
    return await this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Response> {
    return await this.serviceService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', fileUpload(FilePath.SERVICE_IMAGES)),
  )
  async create(
    @Body() createserviceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    if (!file) {
      throw new HttpException('File must be provided', HttpStatus.BAD_REQUEST);
    }

    const imagepath = FilePath.SERVICE_IMAGES + '/' + file.filename;
    return this.serviceService.create(createserviceDto, imagepath);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', fileUpload(FilePath.SERVICE_IMAGES)),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    const imagePath = FilePath.SERVICE_IMAGES + '/' + file.filename;
    return await this.serviceService.update(id, updateServiceDto, imagePath);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.serviceService.delete(id);
  }
}
