import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { UserAddress } from 'src/entities/address.entity';
import { Category } from 'src/entities/category.entity';
import { OrderItem } from 'src/entities/order-items.entity';
import { OrderDetail } from 'src/entities/order.entity';
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
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  private mapOrderToResponse(order: OrderDetail) {
    return {
      order_id: order.order_id,
      description: order.description,
      coupon_code: order.coupon_code,
      express_delivery_charges: order.express_delivery_charges,
      sub_total: order.sub_total,
      shipping_charge: order.shipping_charge,
      total: order.total,
      address_details: order.address_details,

      item_field: `product_id,  service_id,  category_id :price`,
      items: order.items.map((item) => ({
        item_details: `${item.product_id}_${item.service_id}_${item.category_id} : ${item.price}`,
      })),
    };
  }

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
      where: { address_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id ${address_id} not found`);
    }

    const address_details = `${address.building_number}, ${address.area}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`;

    const total = sub_total + shipping_charge + (express_delivery_charges || 0);

    const orderDetail = this.orderRepository.create({
      coupon_code,
      express_delivery_charges,
      sub_total,
      shipping_charge,
      total,
      address,
      address_id,
      address_details: address_details,
    });
    const savedOrderDetail = await this.orderRepository.save(orderDetail);

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const [category, product, service] = await Promise.all([
          this.categoryRepository.findOne({
            where: { category_id: item.category_id },
          }),
          this.productRepository.findOne({
            where: { product_id: item.product_id },
          }),
          this.serviceRepository.findOne({
            where: { service_id: item.service_id },
          }),
        ]);

        if (!category || !product || !service) {
          throw new NotFoundException(
            `Invalid category, product, or service ID`,
          );
        }

        return this.orderItemRepository.create({
          order: savedOrderDetail,
          category,
          product,
          service,
          price: item.price,
        });
      }),
    );

    await this.orderItemRepository.save(orderItems);

    return {
      statusCode: 201,
      message: 'Order details added successfully',
    };
  }

  async findAll(): Promise<Response> {
    const orders = await this.orderRepository.find({
      where: { deleted_at: null },
    });

    const result = orders.map(this.mapOrderToResponse.bind(this));

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

    const result = this.mapOrderToResponse(order);

    return {
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: result,
    };
  }
}
