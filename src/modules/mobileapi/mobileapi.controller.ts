import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
