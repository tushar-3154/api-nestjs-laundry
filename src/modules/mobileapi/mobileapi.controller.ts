import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { MobileApiService } from './mobileapi.service';

@Controller('mobile')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.CUSTOMER)
export class MobileApiController {
  constructor(private readonly mobileApiService: MobileApiService) {}

  @Get('/home')
  async findAll(): Promise<Response> {
    return await this.mobileApiService.findAll();
  }

  @Get('products')
  async getProductsByCategoryAndService(
    @Query('category_id') category_id: number,
    @Query('service_id') service_id: number,
  ): Promise<Response> {
    return await this.mobileApiService.getProductsByCategoryAndService(
      category_id,
      service_id,
    );
  }
}
