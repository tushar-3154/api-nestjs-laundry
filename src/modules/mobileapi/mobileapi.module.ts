import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/banner.entity';
import { Service } from 'src/entities/service.entity';
import { BannerService } from '../banner/banner.service';
import { ServicesService } from '../services/services.service';
import { HomeController } from './mobileapi.controller';
import { HomeService } from './mobileapi.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Banner])],
  controllers: [HomeController],
  providers: [HomeService, BannerService, ServicesService],
})
export class HomeModule {}
