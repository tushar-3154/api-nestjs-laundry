import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';
import { Category } from 'src/entities/category.entity';
import { Price } from 'src/entities/price.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { BannerService } from '../banner/banner.service';
import { PriceService } from '../price/price.service';
import { ProductService } from '../products/product.service';
import { ServicesService } from '../services/services.service';
import { MobileApiController } from './mobileapi.controller';
import { MobileApiService } from './mobileapi.service';

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
  providers: [
    MobileApiService,
    BannerService,
    ServicesService,
    PriceService,
    ProductService,
  ],
})
export class MobileApiModule {}
