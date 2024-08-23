import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Coupon } from 'src/entities/coupon.entity';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Response> {
    const discountCoupon = this.couponRepository.create(createCouponDto);
    const result = await this.couponRepository.save(discountCoupon);

    return {
      statusCode: 201,
      message: 'discount coupon added successfully',
      data: result,
    };
  }

  async findAll(): Promise<Response> {
    const result = await this.couponRepository.find({
      where: { deleted_at: null },
    });
    return {
      statusCode: 200,
      message: 'discount coupon retrieved successfully',
      data: result,
    };
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto,
  ): Promise<Response> {
    const coupon = await this.couponRepository.findOne({
      where: { coupon_id: id },
    });

    if (!coupon) {
      return {
        statusCode: 404,
        message: 'coupon not found',
        data: null,
      };
    }

    await this.couponRepository.update(id, updateCouponDto);

    return {
      statusCode: 200,
      message: 'coupon updated successfully',
      data: { coupon },
    };
  }

  async remove(id: number): Promise<Response> {
    const coupon = await this.couponRepository.findOne({
      where: { coupon_id: id, deleted_at: null },
    });
    if (!coupon) {
      return {
        statusCode: 404,
        message: 'Category not found',
        data: null,
      };
    }
    coupon.deleted_at = new Date();
    await this.couponRepository.save(coupon);

    return {
      statusCode: 200,
      message: 'Category deleted successfully',
      data: coupon,
    };
  }
}
