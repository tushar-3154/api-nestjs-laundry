import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/data-source';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { BannerModule } from './modules/banner/banner.module';
import { BranchModule } from './modules/branch/branch.module';
import { CategoryModule } from './modules/categories/category.module';
import { CompanyModule } from './modules/company/company.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { MobileApiModule } from './modules/mobileapi/mobileapi.module';
import { NotesModule } from './modules/notes/note.module';
import { OrderModule } from './modules/order/order.module';
import { PriceModule } from './modules/price/price.module';
import { ProductModule } from './modules/products/product.module';
import { ServicesModule } from './modules/services/services.module';
import { SettingModule } from './modules/settings/setting.module';
import { UsersModule } from './modules/user/user.module';
import { IsUniqueConstraint } from './modules/validator/is-unique-constarint';
import { MorganMiddleware } from './morgan.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    ServicesModule,
    PriceModule,
    BannerModule,
    SettingModule,
    OrderModule,
    CouponModule,
    CompanyModule,
    BranchModule,
    NotesModule,
    MobileApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
