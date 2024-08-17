import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { UserAddress } from 'src/entities/address.entity';
import { Category } from 'src/entities/category.entity';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderRepository: Repository<OrderDetail>,
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Response> {
    const { items, coupon_code, subTotal, shippingCharge, address_id } =
      createOrderDto;

    const address = await this.addressRepository.findOne({
      where: { address_id: address_id },
    });

    if (!address) {
      throw new Error(`Address with id ${address_id} not found`);
    }

    const total = subTotal + shippingCharge;

    const order = this.orderRepository.create({
      items,
      coupon_code,
      sub_total: subTotal,
      shipping_charge: shippingCharge,
      total,
      address,

      address_id: address.address_id,
    });

    const result = await this.orderRepository.save(order);

    return {
      statusCode: 201,
      message: 'order detail added successfully',
      data: result,
    };
  }

  async findAll(): Promise<Response> {
    const orders = await this.orderRepository.find({
      where: { deleted_at: null },
    });

    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  async findOne(orderId: number): Promise<Response> {
    const order = await this.orderRepository.findOne({
      where: { order_id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: order,
    };
  }
}
