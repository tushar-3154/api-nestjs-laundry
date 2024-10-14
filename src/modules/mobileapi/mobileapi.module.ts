import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';
import { Category } from 'src/entities/category.entity';
import { Price } from 'src/entities/price.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { BannerService } from '../banner/banner.service';
import { PriceService } from '../price/price.service';
import { ServicesService } from '../services/services.service';
import { ApiService } from './api.service';
import { MobileApiController } from './mobileapi.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      Banner,
      Price,
      Category,
      Service,
      Product,
    ]),
  ],
  controllers: [MobileApiController],
  providers: [ApiService, BannerService, ServicesService, PriceService],
  exports: [ApiService],
})
export class MobileApiModule {}
