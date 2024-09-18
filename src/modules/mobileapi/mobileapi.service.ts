import { Injectable } from '@nestjs/common';
import { Response } from 'src/dto/response.dto';
import { BannerService } from '../banner/banner.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class MobileApiService {
  constructor(
    private readonly serviceService: ServicesService,
    private readonly bannerService: BannerService,
  ) {}

  async findAll(): Promise<Response> {
    const [services, banners] = await Promise.all([
      this.serviceService.findAll(),
      this.bannerService.findAll(),
    ]);

    return {
      statusCode: 200,
      message: 'Services and banners retrieved successfully',
      data: {
        services: services,
        banners: banners,
      },
    };
  }
}
