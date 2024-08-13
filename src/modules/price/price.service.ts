import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Category } from 'src/entities/category.entity';
import { Price } from 'src/entities/price.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { IsNull, Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-price.dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createPriceDto: CreatePriceDto): Promise<Response> {
    await this.priceRepository.update(
      { deleted_at: IsNull() },
      { deleted_at: new Date() },
    );
    await this.priceRepository.insert(createPriceDto.prices);

    return {
      statusCode: 201,
      message: 'price added successfully',
    };
  }

  async findAll(): Promise<Response> {
    const price = await this.priceRepository.find();
    return {
      statusCode: 200,
      message: 'prices retrieved successfully',
      data: { price },
    };
  }
}
