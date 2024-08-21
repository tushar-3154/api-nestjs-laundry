import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Response } from 'src/dto/response.dto';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { UpdateSettingDto } from './dto/update-settings.dto';
import { SettingService } from './setting.service';

@Controller('settings')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Roles(Role.SUPER_ADMIN, Role.SUB_ADMIN, Role.CUSTOMER)
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Put()
  async update(@Body() updateSettingDto: UpdateSettingDto): Promise<Response> {
    return await this.settingService.update(updateSettingDto);
  }

  @Get()
  async findAll(): Promise<Response> {
    return await this.settingService.findAll();
  }
}