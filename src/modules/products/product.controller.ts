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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('mobile')
  @Roles(Role.CUSTOMER)
  async getAll(): Promise<Response> {
    return await this.productService.getAll();
  }

  @Get()
  async findAll(): Promise<Response> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Response> {
    return await this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', fileUpload(FilePath.PRODUCT_IMAGES)),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    if (!file) {
      throw new HttpException('File must be provide', HttpStatus.BAD_REQUEST);
    }
    const imagepath = FilePath.PRODUCT_IMAGES + '/' + file.filename;
    return this.productService.create(createProductDto, imagepath);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', fileUpload(FilePath.PRODUCT_IMAGES)),
  )
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    const imagePath = FilePath.PRODUCT_IMAGES + '/' + file.filename;
    return await this.productService.update(id, updateProductDto, imagePath);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    return await this.productService.delete(id);
  }
}
