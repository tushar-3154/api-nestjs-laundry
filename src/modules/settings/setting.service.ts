import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/dto/response.dto';
import { Setting } from 'src/entities/setting.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/update-settings.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private dataSource: DataSource,
  ) {}
  async update(updateSettingDto: UpdateSettingDto): Promise<Response> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Setting,
        {
          setting_key: updateSettingDto.setting_key,
          deleted_at: IsNull(),
        },
        { deleted_at: new Date() },
      );

      await queryRunner.manager.save(Setting, updateSettingDto);

      await queryRunner.commitTransaction();

      return {
        statusCode: 200,
        message: 'Settings updated successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Response> {
    const setting = await this.settingRepository.find({
      where: { deleted_at: null },
    });

    const result = {};
    setting.map((element) => {
      result[element.setting_key] = element.setting_value;
    });

    return {
      statusCode: 200,
      message: 'settings retrieved successfully ',
      data: result,
    };
  }

  async getEstimatedPickupTime(isExpress: boolean): Promise<string> {
    const settingKey = isExpress
      ? 'estimate_pickup_express_hour'
      : 'estimate_pickup_normal_hour';

    const setting = await this.settingRepository.findOne({
      where: { setting_key: settingKey },
    });

    return setting ? setting.setting_value : 'N/A';
  }
}
