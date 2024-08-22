import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Product } from 'src/entities/product.entity';
import { appendBaseUrlToImages } from 'src/utils/image-path.helper';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Response> {
    const product = await this.productRepository.find({
      where: { deleted_at: null },
    });

    const products = appendBaseUrlToImages(product);
    return {
      statusCode: 200,
      message: 'Product retrieved successfully',
      data: { product: products },
    };
  }

  async findAll(): Promise<Response> {
    const product = await this.productRepository.find({
      where: { deleted_at: null },
    });

    const products = appendBaseUrlToImages(product);

    return {
      statusCode: 200,
      message: 'product retrieved successfully',
      data: { product: products },
    };
  }

  async findOne(id: number): Promise<Response> {
    const product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const products = appendBaseUrlToImages([product])[0];
    return {
      statusCode: 200,
      message: 'product retrieved successfully',
      data: { product: products },
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
    const Product = appendBaseUrlToImages([result])[0];

    return {
      statusCode: 201,
      message: 'product added successfully',
      data: { result: Product },
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imagePath?: string,
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

    const updateData = {
      ...updateProductDto,
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    await this.productRepository.update(id, updateData);

    const update_product = await this.productRepository.findOne({
      where: { product_id: id, deleted_at: null },
    });

    if (!update_product) {
      return {
        statusCode: 404,
        message: 'Product not found',
        data: null,
      };
    }
    const products = appendBaseUrlToImages([update_product])[0];

    return {
      statusCode: 200,
      message: 'product updated successfully',
      data: { update_product: products },
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

    const products = appendBaseUrlToImages([product])[0];

    product.deleted_at = new Date();
    await this.productRepository.save(product);
    return {
      statusCode: 200,
      message: 'Product deleted successfully',
      data: { product: products },
    };
  }
}
