import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { DiscountCouponService } from './discount-coupon.service';
import { CreateDiscountCouponDto } from './dto/create-discount-coupon.dto';

@Controller()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
export class DiscountCouponController {
  constructor(private readonly discountCouponService: DiscountCouponService) {}

  @Post('admin/discount-coupon')
  async create(
    @Body() createDiscountCouponDto: CreateDiscountCouponDto,
  ): Promise<Response> {
    return await this.discountCouponService.create(createDiscountCouponDto);
  }

  @Get('admin/discount-coupon')
  async findAll(): Promise<Response> {
    return await this.discountCouponService.findAll();
  }

  @Put('admin/discount-coupon/:id')
  update(
    @Param('id') id: number,
    @Body() updateDiscountCouponDto: CreateDiscountCouponDto,
  ): Promise<Response> {
    return this.discountCouponService.update(id, updateDiscountCouponDto);
  }

  @Delete('admin/discount-coupon/:id')
  async remove(@Param('id') id: number): Promise<Response> {
    return await this.discountCouponService.remove(id);
  }
}
