/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
