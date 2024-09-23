import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Carts } from 'src/entities/cart.entity';
import { Price } from 'src/entities/price.entity';
import { Repository } from 'typeorm';
import { AddCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
  ) {}

  async addToCart(addCartDto: AddCartDto, user_id: number): Promise<Response> {
    const { category_id, product_id, service_id, quantity } = addCartDto;

    const priceEntry = await this.cartRepository.manager
      .createQueryBuilder(Price, 'price')
      .where('price.category_id = :category_id', { category_id })
      .andWhere('price.product_id = :product_id', { product_id })
      .andWhere('price.service_id = :service_id', { service_id })
      .andWhere('price.deleted_at IS NULL')
      .getOne();

    if (!priceEntry) {
      return {
        statusCode: 404,
        message:
          'Price not found for the specified category, product, and service',
      };
    }

    const cart = this.cartRepository.create({
      ...addCartDto,
      user_id,
      quantity,
    });

    const result = await this.cartRepository.save(cart);

    return {
      statusCode: 201,
      message: 'Cart added successfully',
      data: { result, price: priceEntry.price },
    };
  }

  async getAllCarts(user_id: number): Promise<Response> {
    const carts = await this.cartRepository.find({
      where: { user_id: user_id },
    });

    const cartsWithPrices = await Promise.all(
      carts.map(async (cart) => {
        const priceEntry = await this.cartRepository.manager
          .createQueryBuilder(Price, 'price')
          .where('price.category_id = :category_id', {
            category_id: cart.category_id,
          })
          .andWhere('price.product_id = :product_id', {
            product_id: cart.product_id,
          })
          .andWhere('price.service_id = :service_id', {
            service_id: cart.service_id,
          })
          .getOne();

        return {
          ...cart,
          Price: priceEntry.price,
        };
      }),
    );

    return {
      statusCode: 200,
      message: 'Cart retrieved successfully',
      data: cartsWithPrices,
    };
  }

  async updateCart(cart_id: number, quantity: number): Promise<Response> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cart_id },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.quantity = quantity;

    const updated = await this.cartRepository.save(cart);

    return {
      statusCode: 200,
      message: 'Cart updated successfully',
      data: updated,
    };
  }

  async removeCart(cart_id: number): Promise<Response> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cart_id },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartRepository.delete(cart_id);

    return {
      statusCode: 200,
      message: 'Cart removed successfully',
      data: null,
    };
  }
}
