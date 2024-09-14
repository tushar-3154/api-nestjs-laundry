import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { ApplyCouponDto } from './dto/create.verify-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('admin/coupon')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Response> {
    return await this.couponService.create(createCouponDto);
  }

  @Get('admin/coupon')
  async findAll(
    @Query('per_page') per_page?: number,
    @Query('page_number') page_number?: number,
  ): Promise<Response> {
    return await this.couponService.findAll(per_page, page_number);
  }

  @Post('coupon/apply')
  @Roles(Role.CUSTOMER)
  async applyCoupon(
    @Body() applyCouponDto: ApplyCouponDto,
    @Param('userId') userId: number,
  ): Promise<Response> {
    return this.couponService.applyCoupon(applyCouponDto, userId);
  }

  @Put('admin/coupon/:id')
  update(
    @Param('id') id: number,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<Response> {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete('admin/coupon/:id')
  async remove(@Param('id') id: number): Promise<Response> {
    return await this.couponService.remove(id);
  }
}
