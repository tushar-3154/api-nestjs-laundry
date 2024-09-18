import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { HomeService } from './mobileapi.service';

@Controller('mobileapi')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.CUSTOMER)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/home')
  async findAll(): Promise<Response> {
    return await this.homeService.findAll();
  }
}
