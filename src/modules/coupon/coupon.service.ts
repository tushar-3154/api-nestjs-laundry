import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Coupon } from 'src/entities/coupon.entity';
import { OrderDetail } from 'src/entities/order.entity';
import { DiscountType } from 'src/enum/coupon_type.enum';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { ApplyCouponDto } from './dto/create.verify-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,

    @InjectRepository(OrderDetail)
    private readonly orderRepository: Repository<OrderDetail>,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Response> {
    try {
      const discountCoupon = this.couponRepository.create(createCouponDto);
      const result = await this.couponRepository.save(discountCoupon);

      return {
        statusCode: 201,
        message: 'discount coupon added successfully',
        data: result,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Coupon code already exists');
      }
      throw error;
    }
  }

  async findAll(per_page?: number, page_number?: number): Promise<Response> {
    const pagenumber = page_number ?? 1;
    const perpage = per_page ?? 10;
    const skip = (pagenumber - 1) * perpage;
    const [result, total] = await this.couponRepository.findAndCount({
      where: { deleted_at: null },
      take: perpage,
      skip: skip,
    });
    return {
      statusCode: 200,
      message: 'discount coupon retrieved successfully',
      data: { result, limit: perpage, page_number: page_number, count: total },
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
        message: 'coupon not found',
        data: null,
      };
    }
    coupon.deleted_at = new Date();
    await this.couponRepository.save(coupon);

    return {
      statusCode: 200,
      message: 'coupon deleted successfully',
      data: coupon,
    };
  }

  async applyCoupon(
    applyCouponDto: ApplyCouponDto,
    user_id: number,
  ): Promise<Response> {
    const { coupon_Code, order_Total } = applyCouponDto;

    const coupon = await this.couponRepository.findOne({
      where: { code: coupon_Code, deleted_at: null },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid coupon code');
    }

    const currentDate = new Date();
    if (currentDate < coupon.start_time || currentDate > coupon.end_time) {
      throw new BadRequestException('Coupon is not valid at this time');
    }

    const totalCouponUsedCount = await this.orderRepository.count({
      where: { coupon_code: coupon_Code },
    });

    if (totalCouponUsedCount >= coupon.total_usage_count) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    const userCouponUsedCount = await this.orderRepository.count({
      where: { coupon_code: coupon_Code, user_id: user_id },
    });

    if (userCouponUsedCount >= coupon.maximum_usage_count_per_user) {
      throw new BadRequestException(
        'You have exceeded the usage limit for this coupon',
      );
    }

    let discountAmount = 0;
    if (coupon.discount_type === DiscountType.PERCENTAGE) {
      discountAmount = (order_Total * coupon.discount_value) / 100;
    } else if (coupon.discount_type === DiscountType.AMOUNT) {
      discountAmount = coupon.discount_value;
    }

    const finalTotal = order_Total - discountAmount;

    return {
      statusCode: 200,
      message: 'Coupon applied successfully',
      data: {
        discountAmount,
        finalTotal,
      },
    };
  }
}
