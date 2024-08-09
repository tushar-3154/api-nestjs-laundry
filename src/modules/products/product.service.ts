import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Response> {
    const result = await this.productRepository.find({
      where: { deleted_at: null },
    });
    return {
      statusCode: 200,
      message: 'product retrieved successfully',
      data: { result },
    };
  }

  async findOne(id: number): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: 'product retrieved successfully',
      data: { product },
    };
  }
  async create(
    createProductDto: CreateProductDto,
    imagePath: string,
  ): Promise<Response> {
    const product = this.productRepository.create({
      ...createProductDto,
      image: imagePath,
    });

    const result = await this.productRepository.save(product);
    if (product?.image)
      product.image = process.env.BASE_URL + '/' + product.image;
    return {
      statusCode: 201,
      message: 'product added successfully',
      data: { result },
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imagePath: string,
  ): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });
    if (!product) {
      return {
        statusCode: 404,
        message: 'product not found',
        data: null,
      };
    }
    await this.productRepository.update(id, {
      ...updateProductDto,
      image: imagePath,
    });

    const update_product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });
    if (update_product?.image)
      update_product.image = process.env.BASE_URL + '/' + update_product.image;

    return {
      statusCode: 200,
      message: 'product updated successfully',
      data: { update_product },
    };
  }

  async delete(id: number): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });
    if (!product) {
      return {
        statusCode: 404,
        message: 'Product not found',
        data: null,
      };
    }
    product.deleted_at = new Date();
    await this.productRepository.save(product);
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
