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
  constructor(private readonly couponService: CouponService) {}

  @Post('admin/coupon')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Response> {
    return await this.couponService.create(createCouponDto);
  }

  @Get('admin/coupon')
  async findAll(): Promise<Response> {
    return await this.couponService.findAll();
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
