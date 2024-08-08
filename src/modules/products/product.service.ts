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
    const result = await this.productRepository.find();
    return {
      statusCode: 200,
      message: 'product retrieved successfully',
      data: { result },
    };
  }

  async findOne(id: number): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { id },
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
  async create(createProductDto: CreateProductDto): Promise<Response> {
    const product = this.productRepository.create(createProductDto);
    const result = await this.productRepository.save(product);
    return {
      statusCode: 201,
      message: 'product added successfully',
      data: { result },
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      return {
        statusCode: 404,
        message: 'product not found',
        data: null,
      };
    }
    await this.productRepository.update(id, updateProductDto);

    const update_product = await this.productRepository.findOne({
      where: { id },
    });

    return {
      statusCode: 200,
      message: 'product updated successfully',
      data: { update_product },
    };
  }

  async delete(id: number): Promise<Response> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      return {
        statusCode: 404,
        message: 'Product not found',
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      data: result,
    };
  }
}
