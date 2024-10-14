import { Controller, Get, Query } from '@nestjs/common';
import { Response } from 'src/dto/response.dto';
import { BannerService } from '../banner/banner.service';
import { MobileApiService } from '../mobileapi/mobileapi.service';
import { ServicesService } from '../services/services.service';

@Controller('web')
export class WebController {
  constructor(
    private readonly mobileApiService: MobileApiService,
    private readonly serviceService: ServicesService,
    private readonly bannerService: BannerService,
  ) {}

  @Get('banners')
  async getAllBanners(): Promise<Response> {
    return await this.bannerService.getAll();
  }

  @Get('products')
  async getProductsByCategoryAndService(
    @Query('category_id') category_id: number,
    @Query('service_id') service_id: number,
  ): Promise<Response> {
    return await this.mobileApiService.getProductsByCategoryAndService(
      category_id,
      service_id,
    );
  }

  @Get('categories')
  async getCategoriesByService(
    @Query('service_id') service_id: number,
  ): Promise<Response> {
    return await this.mobileApiService.getCategoriesByService(service_id);
  }

  @Get('services')
  async getAllServices(): Promise<Response> {
    return await this.serviceService.getAll();
  }
}
