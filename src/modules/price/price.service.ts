import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ejs from 'ejs';
import * as fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { Response } from 'src/dto/response.dto';
import { Category } from 'src/entities/category.entity';
import { Price } from 'src/entities/price.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { appendBaseUrlToImages } from 'src/utils/image-path.helper';
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
  async getPricesByCategoryAndService(category_id: number, service_id: number) {
    const prices = await this.priceRepository.find({
      where: {
        category: { category_id: category_id },
        service: { service_id: service_id },
      },
      relations: ['product'],
    });

    return prices.map((price) => ({
      ...price,
      product: {
        ...price.product,
        image: appendBaseUrlToImages([{ image: price.product.image }])[0].image,
      },
    }));
  }

  async getCategoriesByService(service_id: number) {
    const uniqueCategories = await this.priceRepository
      .createQueryBuilder('price')
      .innerJoinAndSelect('price.category', 'category')
      .innerJoinAndSelect('price.service', 'service')
      .where('service.service_id = :service_id', { service_id: service_id })
      .groupBy('category.category_id')
      .select(['category.category_id', 'category.name'])
      .getRawMany();

    return uniqueCategories;
  }

  async generatePriceListPDF(): Promise<Buffer> {
    const base_url = process.env.BASE_URL;
    const prices = await this.priceRepository
      .createQueryBuilder('price')
      .leftJoinAndSelect('price.category', 'category')
      .leftJoinAndSelect('price.product', 'product')
      .leftJoinAndSelect('price.service', 'service')
      .select(['category.name', 'product.name', 'service.name', 'price.price'])
      .getRawMany();

    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'src/templates/price-list-template.ejs',
    );

    const templateFile = fs.readFileSync(templatePath, 'utf8');

    const data = {
      logoUrl: `${base_url}/images/logo/logo.png`,
      prices,
    };

    const htmlContent = ejs.render(templateFile, data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
