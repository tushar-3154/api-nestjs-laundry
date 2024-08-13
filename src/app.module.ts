import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/data-source';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/category.module';
import { PriceModule } from './modules/price/price.module';
import { ProductModule } from './modules/products/product.module';
import { ServicesModule } from './modules/services/services.module';
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
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
