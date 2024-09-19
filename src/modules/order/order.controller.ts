import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  @Roles(Role.CUSTOMER)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Response> {
    return this.orderService.create(createOrderDto);
  }

  @Get('orders/summary')
  @Roles(Role.CUSTOMER)
  async getOrder(): Promise<Response> {
    return this.orderService.getOrder();
  }

  @Get('order/all')
  @Roles(Role.CUSTOMER)
  async getAll(): Promise<Response> {
    return this.orderService.findAll();
  }

  @Get('admin/orders')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async findAll(): Promise<Response> {
    return this.orderService.findAll();
  }

  @Get('admin/orders/:id')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    return this.orderService.findOne(id);
  }

  @Put('admin/orders/:id')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Response> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Patch('admin/orders/:order_id/update-status/')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async updateOrderStatus(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Body('status') status: number,
  ): Promise<Response> {
    return this.orderService.updateOrderStatus(order_id, status);
  }

  @Patch('admin/orders/:order_id/update-payment-status')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async updatePaymentStatus(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Body('status') status: number,
  ): Promise<Response> {
    return this.orderService.updatePaymentStatus(order_id, status);
  }

  @Patch('admin/orders/:order_id/assign-delivery')
  @Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
  async assignDeliveryBoy(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Body('delivery_boy_id') delivery_boy_id: number,
  ): Promise<Response> {
    return this.orderService.assignDeliveryBoy(order_id, delivery_boy_id);
  }
}
