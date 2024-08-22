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
    const {
      items,
      coupon_code,
      express_delivery_charges,
      sub_total,
      shipping_charge,
      address_id,
    } = createOrderDto;

    const address = await this.addressRepository.findOne({
      where: { address_id: address_id },
    });

    if (!address) {
      throw new NotFoundException(`Address with id ${address_id} not found`);
    }

    const total = sub_total + shipping_charge + (express_delivery_charges || 0);

    for (const item of items) {
      const order = this.orderRepository.create({
        category_id: item.category_id,
        product_id: item.product_id,
        service_id: item.service_id,
        price: item.price,
        description: item.description,
        coupon_code,
        express_delivery_charges,
        sub_total,
        shipping_charge,
        total,
        address,
        address_id: address.address_id,
      });

      await this.orderRepository.save(order);
    }

    return {
      statusCode: 201,
      message: 'Order details added successfully',
    };
  }

  async findAll(): Promise<Response> {
    const orders = await this.orderRepository.find({
      where: { deleted_at: null },
    });

    const result = orders.map((order) => ({
      order_id: order.order_id,
      item_details: `product_id , service_id , category_id  :  price`,

      items: {
        item_details: `${order.product_id}_${order.service_id}_${order.category_id} : ${order.price}`,
      },
      description: order.description,
      coupon_code: order.coupon_code,
      express_delivery_charges: order.express_delivery_charges,
      sub_total: order.sub_total,
      shipping_charge: order.shipping_charge,
      total: order.total,
      address_id: order.address_id,
    }));

    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: result,
    };
  }

  async findOne(order_id: number): Promise<Response> {
    const order = await this.orderRepository.findOne({
      where: { order_id: order_id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${order_id} not found`);
    }

    const result = {
      order_id: order.order_id,
      item_details: `product_id , service_id , category_id   :   price`,
      items: {
        item_details: `${order.product_id}_${order.service_id}_${order.category_id} : ${order.price}`,
      },
      description: order.description,
      coupon_code: order.coupon_code,
      express_delivery_charges: order.express_delivery_charges,
      sub_total: order.sub_total,
      shipping_charge: order.shipping_charge,
      total: order.total,
      address_id: order.address_id,
      address: `${order.address.building_number}, ${order.address.area}`,
    };

    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: result,
    };
  }
}
