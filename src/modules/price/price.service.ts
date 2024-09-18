import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Category } from 'src/entities/category.entity';
import { Price } from 'src/entities/price.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
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

    private dataSource: DataSource,
  ) {}

  async create(createPriceDto: CreatePriceDto): Promise<Response> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Price,
        { deleted_at: IsNull() },
        { deleted_at: new Date() },
      );

      await queryRunner.manager.insert(Price, createPriceDto.prices);

      await queryRunner.commitTransaction();

      return {
        statusCode: 201,
        message: 'Price added successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Response> {
    const price = await this.priceRepository.find({
      where: { deleted_at: null },
    });
    const result = {};
    price.map((element) => {
      result[
        element.category_id +
          '_' +
          element.product_id +
          '_' +
          element.service_id
      ] = element.price;
    });

    return {
      statusCode: 200,
      message:
        'prices retrieved successfully (category_id, product_id, service_id)',
      data: result,
    };
  }

  async getPricesByCategoryAndService(
    category_id: number,
    service_id: number,
  ): Promise<any> {
    return await this.priceRepository.find({
      where: {
        category: { category_id: category_id },
        service: { service_id: service_id },
      },
    });
  }
}
