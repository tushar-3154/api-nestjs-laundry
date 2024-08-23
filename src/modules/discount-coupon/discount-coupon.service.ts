import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { DiscountCoupon } from 'src/entities/discount-coupon.entity';
import { Repository } from 'typeorm';
import { CreateDiscountCouponDto } from './dto/create-discount-coupon.dto';

@Injectable()
export class DiscountCouponService {
  constructor(
    @InjectRepository(DiscountCoupon)
    private readonly discountCouponRepository: Repository<DiscountCoupon>,
  ) {}

  async create(
    createDiscountCouponDto: CreateDiscountCouponDto,
  ): Promise<Response> {
    const discountCoupon = this.discountCouponRepository.create(
      createDiscountCouponDto,
    );
    const result = await this.discountCouponRepository.save(discountCoupon);

    return {
      statusCode: 201,
      message: 'discount coupon added successfully',
      data: result,
    };
  }

  async findAll(): Promise<Response> {
    const result = await this.discountCouponRepository.find({
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
    updateDiscountCouponDto: CreateDiscountCouponDto,
  ): Promise<Response> {
    const coupon = await this.discountCouponRepository.findOne({
      where: { coupon_id: id },
    });

    if (!coupon) {
      return {
        statusCode: 404,
        message: 'coupon not found',
        data: null,
      };
    }

    await this.discountCouponRepository.update(id, updateDiscountCouponDto);

    return {
      statusCode: 200,
      message: 'coupon updated successfully',
      data: { coupon },
    };
  }

  async remove(id: number): Promise<Response> {
    const coupon = await this.discountCouponRepository.findOne({
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
    await this.discountCouponRepository.save(coupon);

    return {
      statusCode: 200,
      message: 'Category deleted successfully',
      data: coupon,
    };
  }
}
