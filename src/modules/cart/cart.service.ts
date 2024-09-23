import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { CartItem } from 'src/entities/cart-items.entity';
import { Repository } from 'typeorm';
import { AddCartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async addItemToCart(
    addCartDto: AddCartItemDto,
    user_id: number,
  ): Promise<Response> {
    const { category_id, product_id, service_id, quantity, price } = addCartDto;

    const totalprice = quantity * price;

    const cartItem = this.cartItemRepository.create({
      category_id: category_id,
      product_id: product_id,
      service_id: service_id,
      user_id: user_id,
      quantity,
      price: totalprice,
    });

    const result = await this.cartItemRepository.save(cartItem);

    return {
      statusCode: 201,
      message: 'cart item added succssfully',
      data: { result },
    };
  }

  async getAllCartItems(user_id: number): Promise<Response> {
    const cartItems = await this.cartItemRepository.find({
      where: { user_id: user_id },
    });
    return {
      statusCode: 200,
      message: 'Cart items retrieved successfully',
      data: cartItems,
    };
  }

  async updateCartItem(cart_id: number, quantity: number): Promise<Response> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart_id: cart_id },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const Price = cartItem.price / cartItem.quantity;
    cartItem.quantity = quantity;
    cartItem.price = Price * quantity;
    console.log(cartItem.price);

    const updatedItem = await this.cartItemRepository.save(cartItem);

    return {
      statusCode: 200,
      message: 'Cart item updated successfully',
      data: updatedItem,
    };
  }

  async removeCartItem(cart_id: number): Promise<Response> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart_id: cart_id },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.delete(cart_id);

    return {
      statusCode: 200,
      message: 'Cart item removed successfully',
      data: null,
    };
  }
}
