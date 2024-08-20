import { Body, Controller, Param, Put } from '@nestjs/common';
import { Response } from 'src/dto/response.dto';
import { UpdateSettingDto } from './dto/update-settings.dto';
import { SettingService } from './setting.service';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Response> {
    return await this.settingService.update(id, updateSettingDto);
  }
}
