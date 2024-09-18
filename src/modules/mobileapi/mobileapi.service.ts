import { Injectable } from '@nestjs/common';
import { Response } from 'src/dto/response.dto';
import { BannerService } from '../banner/banner.service';
import { PriceService } from '../price/price.service';
import { ProductService } from '../products/product.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class MobileApiService {
  constructor(
    private readonly serviceService: ServicesService,
    private readonly bannerService: BannerService,
    private readonly priceService: PriceService,
    private readonly productService: ProductService,
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

  async getProductsByCategoryAndService(
    category_id: number,
    service_id: number,
  ): Promise<Response> {
    const prices = await this.priceService.getPricesByCategoryAndService(
      category_id,
      service_id,
    );

    const productIds = prices.map((price) => price.product.product_id);

    const products = await this.productService.getProductsByIds(productIds);

    return {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  }
}
