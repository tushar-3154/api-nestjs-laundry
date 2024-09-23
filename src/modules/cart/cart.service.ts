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

    const priceEntry = await this.cartRepository.manager.findOne(Price, {
      where: {
        category_id,
        product_id,
        service_id,
      },
    });

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
      price: priceEntry.price,
    });

    const result = await this.cartRepository.save(cart);

    return {
      statusCode: 201,
      message: 'Cart added successfully',
      data: { result },
    };
  }

  async getAllCarts(user_id: number): Promise<Response> {
    const carts = await this.cartRepository.find({
      where: { user_id: user_id },
    });
    return {
      statusCode: 200,
      message: 'Cart retrieved successfully',
      data: carts,
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

    const updatedItem = await this.cartRepository.save(cart);

    return {
      statusCode: 200,
      message: 'Cart updated successfully',
      data: updatedItem,
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
