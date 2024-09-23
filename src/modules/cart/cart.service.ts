import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Carts } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { AddCartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
  ) {}

  async addToCart(
    addCartDto: AddCartItemDto,
    user_id: number,
  ): Promise<Response> {
    const { category_id, product_id, service_id, quantity, price } = addCartDto;

    const totalprice = quantity * price;

    const cart = this.cartRepository.create({
      category_id: category_id,
      product_id: product_id,
      service_id: service_id,
      user_id: user_id,
      quantity,
      price: totalprice,
    });

    const result = await this.cartRepository.save(cart);

    return {
      statusCode: 201,
      message: 'cart item added succssfully',
      data: { result },
    };
  }

  async getAllCarts(user_id: number): Promise<Response> {
    const carts = await this.cartRepository.find({
      where: { user_id: user_id },
    });
    return {
      statusCode: 200,
      message: 'Cart items retrieved successfully',
      data: carts,
    };
  }

  async updateCart(cart_id: number, quantity: number): Promise<Response> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cart_id },
    });
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }

    const Price = cart.price / cart.quantity;
    cart.quantity = quantity;
    cart.price = Price * quantity;
    console.log(cart.price);

    const updatedItem = await this.cartRepository.save(cart);

    return {
      statusCode: 200,
      message: 'Cart item updated successfully',
      data: updatedItem,
    };
  }

  async removeCart(cart_id: number): Promise<Response> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cart_id },
    });

    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.delete(cart_id);

    return {
      statusCode: 200,
      message: 'Cart item removed successfully',
      data: null,
    };
  }
}
