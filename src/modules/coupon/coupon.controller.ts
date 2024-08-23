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
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN)
export class CouponController {
  constructor(private readonly discountCouponService: CouponService) {}

  @Post('admin/discount-coupon')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Response> {
    return await this.discountCouponService.create(createCouponDto);
  }

  @Get('admin/discount-coupon')
  async findAll(): Promise<Response> {
    return await this.discountCouponService.findAll();
  }

  @Put('admin/discount-coupon/:id')
  update(
    @Param('id') id: number,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<Response> {
    return this.discountCouponService.update(id, updateCouponDto);
  }

  @Delete('admin/discount-coupon/:id')
  async remove(@Param('id') id: number): Promise<Response> {
    return await this.discountCouponService.remove(id);
  }
}
