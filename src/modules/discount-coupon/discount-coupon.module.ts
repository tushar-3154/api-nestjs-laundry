import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCoupon } from 'src/entities/discount-coupon.entity';
import { DiscountCouponController } from './discount-coupon.controller';
import { DiscountCouponService } from './discount-coupon.service';
@Module({
  imports: [TypeOrmModule.forFeature([DiscountCoupon])],
  providers: [DiscountCouponService],
  controllers: [DiscountCouponController],
})
export class DiscountCouponModule {}
